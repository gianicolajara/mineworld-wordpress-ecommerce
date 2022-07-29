import { serialize } from "cookie";

export default async function logout(req, res) {
  try {
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

    return res.status(200).json({
      message: "Cierre de sessión exitoso",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error al cerrar sesión",
    });
  }
}
