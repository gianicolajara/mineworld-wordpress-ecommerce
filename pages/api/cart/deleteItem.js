import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { removeItemsFromCart } from "../../../utils/wordpress";

export default async function deleteItem(req, res) {
  const { key } = req.body;

  try {
    const cookies = parse(req?.headers?.cookie || "");

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resRemoveItemsFromCart = await removeItemsFromCart({
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware.token || cookies["X-JWT-Auth"] || "",
        },
        keys: [key],
      });

      return res.status(200).json({
        message: "item eliminado",
        data: resRemoveItemsFromCart,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error al eliminar el item",
    });
  }
}
