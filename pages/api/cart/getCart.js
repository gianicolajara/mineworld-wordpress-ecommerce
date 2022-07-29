import { getCartService } from "../../../utils/wordpress";
import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";

export default async function getCart(req, res) {
  try {
    const cookies = parse(req?.headers?.cookie || "");

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resCarrito = await getCartService({
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware.token || cookies["X-JWT-Auth"] || "",
        },
      });

      return res.status(200).json({
        message: "carrito enviado",
        data: resCarrito,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el carrito",
    });
  }
}
