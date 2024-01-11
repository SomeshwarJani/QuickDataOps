import { connection } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserDetails = (req, res) => {
  const q = `SELECT * FROM user_details;`;
  connection.query(q, (error, data) => {
    if (error) return res.status(500).json(error);
    // res.set("Access-Control-Allow-Origin", "*");
    const token = jwt.sign({ id: data.id }, "secretKey");
    res.set(
      "Access-Control-Allow-Origin",
      "https://user-data-task-clients.vercel.app"
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200);
    res.send(data);
  });
};
