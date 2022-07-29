import axios from "axios";

export default async function createOrder(req, res) {
  try {
    const resPaypalOrder = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        ],
        application_context: {
          brand_name: "PayPal Merchant SDK",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: "https://example.com/return",
          cancel_url: "https://example.com/cancel",
        },
      },
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID || "",
          password: process.env.PAYPAL_CLIENT_SECRET || "",
        },
      }
    );

    res.status(200).json({
      data: resPaypalOrder.data,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error al crear la orden",
    });
  }
}
