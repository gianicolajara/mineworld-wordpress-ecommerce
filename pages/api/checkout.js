import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function checkout(req, res) {
  const { id, amount, customer, description } = req.body;

  if (!id || id === undefined) {
    return res.status(400).json({
      message: "No se ha encontrado el id del metodo de pago",
      statusCode: 400,
    });
  }

  if (!amount || amount === undefined) {
    return res.status(400).json({
      message: "No se ha encontrado el monto",
      statusCode: 400,
    });
  }

  if (!customer || customer === undefined) {
    return res.status(400).json({
      message: "No se ha encontrado el cliente",
      statusCode: 400,
    });
  }

  stripe.customers
    .search({
      query: `email:"${customer?.email}"`,
    })
    .then((customerQuery) => {
      if (customerQuery?.data[0]?.id) {
        return customerQuery.data[0];
      }

      return stripe.customers.create({
        email: customer?.email || "",
        name: customer?.name || "",
        address: {
          country: customer?.address?.country,
        },
      });
    })
    .then((customerFinded) => {
      return stripe.paymentIntents.create({
        amount,
        currency: "usd",
        description: description || "",
        payment_method: id,
        confirm: true,
        customer: customerFinded?.id || "",
      });
    })
    .then((paymentIntent) => {
      return res.status(200).json({
        message: "Pago realizado con exito",
        statusCode: 200,
        paymentIntent,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Error al realizar el pago",
        statusCode: 400,
        error,
      });
    });
}
