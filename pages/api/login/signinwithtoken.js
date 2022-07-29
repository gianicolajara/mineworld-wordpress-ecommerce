import { getUserById } from "../../../utils/wordpress";
import { parse } from "cookie";
import { refreshTokenMiddleware } from "../../../lib/refreshToken";

export default async function signinwithtoken(req, res) {
  try {
    const cookies = parse(req?.headers?.cookie || "");

    if (!cookies["X-JWT-Auth"]) {
      return res.status(200).json({
        message: "No hay un token de autenticación",
        name: "not-token-auth",
      });
    }

    const resRefreshTokenMiddleware = await refreshTokenMiddleware(req, res);

    if (!resRefreshTokenMiddleware) {
      //something was wrong with the refresh token
      return res.status(400).json({
        message: "Error al iniciar sesión",
        name: "error-refresh-token",
      });
    } else {
      //refresh token was ok
      const resSignInWithToken = await getUserById({
        userData: {
          jwtAuthToken: resRefreshTokenMiddleware?.token
            ? resRefreshTokenMiddleware?.token
            : cookies["X-JWT-Auth"] || "",
        },
        id: Number(resRefreshTokenMiddleware?.data?.user?.id) || "",
      });

      //todo
      return res.status(200).json({
        message: "todo fue bien",
        dataUser: {
          ...resSignInWithToken,
          jwtAuthToken: resRefreshTokenMiddleware.token
            ? resRefreshTokenMiddleware.token
            : cookies["X-JWT-Auth"],
        },
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "El token ha expirado",
        name: error.name,
      });
    }
    return res.status(400).json({
      message: "Algo fue mal",
    });
  }
}
