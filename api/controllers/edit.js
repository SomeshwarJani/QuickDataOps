import { connection } from "../connect.js";
import jwt from "jsonwebtoken";

export const editData = (req, res) => {
  const id = req.params.id;
  const q = `SELECT * FROM user_details WHERE id= ?`;
  connection.query(q, [id], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    const token = jwt.sign({ id: data[0].id }, "secretKey");
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200);
    const results = data[0];
    res.json(results);
  });
};
