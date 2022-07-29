import { parse, serialize } from "cookie";
import { refreshToken } from "../utils/wordpress";
import jwt from "jsonwebtoken";

export const refreshTokenMiddleware = async (req, res) => {
  const cookies = parse(req?.headers?.cookie || "");
  return jwt.verify(
    cookies["X-JWT-Auth"],
    process.env.JWT_SECRET || "",
    async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const resRefreshToken = await refreshToken({
            refreshToken: cookies["X-JWT-Refresh"],
          });

          if (resRefreshToken) {
            return jwt.verify(
              resRefreshToken.authToken,
              process.env.JWT_SECRET,
              (errNew, decodedNew) => {
                if (errNew) {
                  res.setHeader("Set-Cookie", [
                    serialize("X-JWT-Auth", "", {
                      path: "/",
                      expires: new Date(0),
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                    }),
                    serialize("X-JWT-Refresh", "", {
                      path: "/",
                      expires: new Date(0),
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                    }),
                  ]);

                  return false;
                }

                res.setHeader(
                  "Set-Cookie",
                  serialize("X-JWT-Auth", resRefreshToken.authToken, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                  })
                );

                return {
                  token: resRefreshToken.authToken,
                  decoded: decodedNew,
                };
              }
            );
          }
        } else {
          return false;
        }
      }

      return decoded;
    }
  );
};
