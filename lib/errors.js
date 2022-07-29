import axios from "axios";

export const errorControllers = async (error) => {
  if (error === "TokenExpiredError") {
    const res = await axios.post("/api/login/refresh");
    return res;
  }
};
