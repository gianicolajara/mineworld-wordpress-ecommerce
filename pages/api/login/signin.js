import { validateFormLogin } from "../../../config/regex";
import { mutationLogin } from "../../../utils/wordpress";
import { serialize } from "cookie";

export default async function signin(req, res) {
  const { username, password } = req.body;

  const validateRes = validateFormLogin({
    username,
    password,
  });

  try {
    if (!validateRes) {
      const resLoginMutation = await mutationLogin({
        user: {
          username,
          password,
        },
      });

      if (!resLoginMutation.errors) {
        res.setHeader("Set-Cookie", [
          serialize("X-JWT-Auth", resLoginMutation?.customer?.jwtAuthToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          }),
          serialize(
            "X-JWT-Refresh",
            resLoginMutation?.customer?.jwtRefreshToken,
            {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            }
          ),
        ]);

        return res.status(200).json({
          data: resLoginMutation,
        });
      } else {
        return res.status(400).json({
          message: "Error al iniciar sesión",
        });
      }
    } else {
      return res.status(400).json({
        message: validateRes,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error?.message || "Algo fue mal iniciando sesión",
    });
  }
}
