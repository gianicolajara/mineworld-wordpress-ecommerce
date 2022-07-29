import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { mutationSetItemsCart } from "../../../utils/wordpress";

export default async function setItems(req, res) {
  const { items } = req.body;

  try {
    const cookies = parse(req?.headers?.cookie || "");

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resMutationSetItems = await mutationSetItemsCart({
        items,
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
    res.status(400).json({
      message: "Error borrando el carro",
    });
  }
}
