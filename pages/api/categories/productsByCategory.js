import { getAllProductsByCategory } from "../../../utils/wordpress";

export default async function productsByCategory(req, res) {
  const { category } = req.body;

  try {
    const products = await getAllProductsByCategory(category);
    if (products) {
      res.status(200).json({
        message: "Productos encontrados",
        products,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
