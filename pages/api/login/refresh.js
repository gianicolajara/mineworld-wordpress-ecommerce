import { refreshToken } from "../../../utils/wordpress";
import { parse, serialize } from "cookie";

export default async function refresh(req, res) {
  try {
    const cookies = parse(req?.headers?.cookie || "");
    const resRefreshToken = await refreshToken({
      refreshToken: cookies["X-JWT-Refresh"],
    });

    return res.status(200).json({
      message: "token refresh exitoso",
      token: resRefreshToken?.authToken || "",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "algo fue mal",
    });
  }
}
