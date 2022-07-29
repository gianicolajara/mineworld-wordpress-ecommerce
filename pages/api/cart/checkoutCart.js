import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { checkout } from "../../../utils/wordpress";

export default async function checkoutCart(req, res) {
  const cookies = parse(req?.headers?.cookie || "");

  const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

  try {
    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resCheckout = await checkout({
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware.token || cookies["X-JWT-Auth"] || "",
        },
      });

      return res.status(200).json({
        message: "Compra realizada",
        data: resCheckout,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Algo fue mal con el checkout",
    });
  }
}
