import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { addItemToCart, mutationSetItemsCart } from "../../../utils/wordpress";

export default async function addItem(req, res) {
  const { product } = req.body;

  try {
    const cookies = parse(req?.headers?.cookie || "");

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resMutationSetItems = await addItemToCart({
        product,
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware.token || cookies["X-JWT-Auth"] || "",
        },
      });

      return res.status(200).json({
        message: "items enviados",
        data: resMutationSetItems,
      });
    }
  } catch (error) {
    return res.status(400).json({
      "message": "No se pudo establecer el producto dentro del carrito",
    });
  }
}
