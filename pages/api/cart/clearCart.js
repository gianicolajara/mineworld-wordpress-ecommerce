import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { mutationClearCart } from "../../../utils/wordpress";

export default async function clearCart(req, res) {
  try {
    const cookies = parse(req?.headers?.cookie || "");

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resClearCart = await mutationClearCart({
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware.token || cookies["X-JWT-Auth"] || "",
        },
      });

      return res.status(200).json({
        message: "carrito borrado",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error borrando el carro",
    });
  }
}
