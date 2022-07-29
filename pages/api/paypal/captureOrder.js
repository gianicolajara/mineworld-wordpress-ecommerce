import axios from "axios";

export default async function captureOrder(req, res) {
  const { id } = req.params;

  try {
    const resCaptureOrder = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID || "",
          password: process.env.PAYPAL_CLIENT_SECRET || "",
        },
      }
    );

    res.status(200).json({
      data: resCaptureOrder.data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al capturar el orden",
    });
  }
}
