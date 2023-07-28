const express = require("express");
const app = express();
// test API key.
const stripe = require("stripe")('sk_test_51NUws3Bz9p5tgQRyZDDBn2zD1tTawjPGRkKJDKUDBW4rDobl918yqkbtvvT2rILipGarv68cO5S39JmfQAaoat0O00wR603WRU');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
    // replace "2000" with a calculation of the total purchase amount.
    // calculate the order total on the server to prevent people from directly manipulating the amount on the client
    return 2000;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a "paymentIntent" with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));