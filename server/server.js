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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
// This is your test secret API key.
const port = process.env.SERVER_PORT || 8080;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const frontendDomain = process.env.FRONTEND_DOMAIN;
if (!stripeKey) {
    throw new Error("The Stripe secret key is missing in .env file");
}
if (!frontendDomain) {
    throw new Error("The frontend domain is missing in .env file");
}
const stripe = new stripe_1.default(stripeKey, { apiVersion: "2022-11-15" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(express.static('public'));
const YOUR_DOMAIN = "http://localhost:5173";
app.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { priceId } = req.body; // you would replace this with the id of the Stripe price you created in the Stripe Dashboard
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
            success_url: `${frontendDomain}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendDomain}/cancelled`,
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
app.listen(port, () => console.log(`Running on port ${port}`));
