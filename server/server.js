"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const frontendDomain = process.env.FRONTEND_DOMAIN;
const successURL = process.env.SUCCESS_URL;
const cancelURL = process.env.CANCEL_URL;
if (!stripeKey) {
    throw new Error("The Stripe secret key is missing in .env file");
}
if (!frontendDomain) {
    throw new Error("The frontend domain is missing in .env file");
}
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
if (!supabaseUrl) {
    throw new Error("The Supabase URL is missing in .env file");
}
if (!supabaseKey) {
    throw new Error("The Supabase key is missing in .env file");
}
function insertLabOrder(session) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = session.metadata;
        const batchId = (0, uuid_1.v4)();
        // create batch for lab order
        const { data: batchData, error: batchError } = yield supabase
            .from("batch")
            .insert([
            {
                id: batchId,
                facility_id: metadata.facilityId,
                producer_user_id: metadata.userId,
                product_type: metadata.productType,
                strain: metadata.strainName,
            },
        ]);
        console.log(batchData);
        console.log(batchError);
        if (batchError) {
            console.error(batchError);
        }
        // Create the order in the database
        const { data, error } = yield supabase.from("lab_order").insert([
            {
                batch_id: batchId,
                location: metadata.location,
                pickup_date: metadata.pickupDate,
                turnaround_time: metadata.turnaroundTime,
            }, // Add the rest of the fields here
        ]);
        console.log(data);
        console.log(error);
        // Check for error
        if (error) {
            console.error(error);
        }
    });
}
const stripe = new stripe_1.default(stripeKey, { apiVersion: "2022-11-15" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(express_1.default.json());
// app.use(express.static('public'));
app.post("/create-checkout-session", express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priceId, userId, facilityId, location, strainName, productType, turnaroundTime, pickupDate, } = req.body;
    try {
        const session = yield stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                priceId,
                userId,
                location,
                strainName,
                productType,
                turnaroundTime,
                pickupDate,
            },
            success_url: `${frontendDomain}${successURL}`,
            cancel_url: `${frontendDomain}${cancelURL}`,
        });
        res.json({ sessionId: session.id });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "an error occurred, unable to create session" });
    }
}));
// Handle webhook events
app.post("/webhook", express_1.default.raw({ type: "application/json" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    if (sig === undefined) {
        console.log("undefined)");
        return res.status(400).send(`Webhook Error: No signature`);
    }
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        // @ts-ignore
        console.log(err);
        // @ts-ignore
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log(event.type);
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        insertLabOrder(session);
    }
    res.json({ received: true });
}));
app.post('/send-email', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailUser = `${process.env.EMAIL_USERNAME}`;
    const emailPass = `${process.env.EMAIL_PASS}`;
    const email_body = req.body['text'];
    console.error(email_body, emailUser, emailPass);
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
        const info = yield transporter.sendMail({
            from: `Team @ Altum 👻 ${emailUser}`,
            to: 'grant.rinehimer@altumlabs.co',
            subject: 'Demo Scheduled',
            text: `${email_body}`,
            html: `<b>${email_body}</b>`, // html body
        });
        // If the message failed to send, throw an error
        if (info.rejected) {
            throw new Error("Mail attempt was rejected.");
        }
    }
    catch (err) {
        console.error(err);
        // @ts-ignore
        return res.status(500).send(`Internal Nodemailer Error: ${err.message}`);
    }
    res.status(200).send({ sent: true });
}));
app.get("/test", (req, res) => {
    res.json({ message: "Hello, this is a test!" });
});
app.listen(port, () => console.log(`Running on port ${port}`));
