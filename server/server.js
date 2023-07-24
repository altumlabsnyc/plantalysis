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
dotenv_1.default.config();
const port = process.env.SERVER_PORT || 8080;
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
        const labOrder = JSON.parse(metadata.labOrder);
        const { location, date, lab_notes } = labOrder;
        const userId = metadata.userId;
        const batchId = (0, uuid_1.v4)();
        const brandId = (0, uuid_1.v4)();
        // first, create brand
        const brandName = metadata.brandName;
        const { data: brandData, error: brandError } = yield supabase
            .from("brand")
            .insert([
            {
                name: brandName,
                id: brandId,
                producer_user_id: userId,
            },
        ]);
        console.log(brandData);
        console.log(brandError);
        if (brandError) {
            console.error(brandError);
        }
        // then, create batch
        const { data: batchData, error: batchError } = yield supabase
            .from("batch")
            .insert([
            {
                id: batchId,
                brand_id: brandId,
            },
        ]);
        console.log(batchData);
        console.log(batchError);
        if (batchError) {
            console.error(batchError);
        }
        // Extract data from the session
        console.log("lab order information in function", location, date, lab_notes);
        // Create the order in the database
        const { data, error } = yield supabase.from("lab_order").insert([
            {
                location,
                pickup_date: date,
                lab_notes,
                batch_id: batchId,
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
app.use((0, cors_1.default)());
// app.use(express.static('public'));
const YOUR_DOMAIN = "http://localhost:5173";
app.post("/create-checkout-session", express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priceId, labOrder, brandName, userId } = req.body; // you would replace this with the id of the Stripe price you created in the Stripe Dashboard
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
                labOrder: JSON.stringify(labOrder),
                brandName: brandName,
                userId: userId,
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
    console.log(sig);
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
app.listen(port, () => console.log(`Running on port ${port}`));
