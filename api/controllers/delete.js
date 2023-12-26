import { connection } from "../connect.js";
import jwt from "jsonwebtoken";

export const deleteData = (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM user_details WHERE id = ?;`;
  connection.query(q, [id], (error, data) => {
    if (error) return res.status(500).json({ message: "No user found" });
    const token = jwt.sign({ id: data.id }, "secretKey");
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200);
    return res.status(200).json({ message: "Data Deleted Successfully" });
  });
};
