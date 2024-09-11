const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  const { amount, id } = req.body;

  const customer = await stripe.customers.create();

  try {
    await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Purchase from My Shop",
      payment_method: id,
      confirm: true,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
