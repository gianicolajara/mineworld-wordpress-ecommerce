import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";
import { mutationCustomer } from "../../../utils/wordpress";

export default async function updateCustomer(req, res) {
  const { newCustomer } = req.body;

  const cookies = parse(req?.headers?.cookie || "");

  try {
    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      return res.status(400).json({
        message: "Error al iniciar sesión",
      });
    } else {
      const resUpdateCustomer = await mutationCustomer({
        newCustomer,
        userData: {
          jwtAuthToken:
            resRefreshTokenMiddleware?.token || cookies["X-JWT-Auth"] || "",
        },
      });

      if (!resUpdateCustomer.errors) {
        return res.status(200).json({
          message: "Usuario actualizado correctamente",
          customer: resUpdateCustomer,
        });
      } else {
        return res.status(400).json({
          message: "Algo fue mal",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "algo fue mal",
    });
  }
}
