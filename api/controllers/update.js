import { connection } from "../connect.js";
import jwt from "jsonwebtoken";

export const updateData = (req, res) => {
  const { name, sector_id, id } = req.body;
  const q = `UPDATE user_details SET name = ?,sector_id = ? WHERE (id = ?);`;
  connection.query(q, [name, sector_id, id], (error, data) => {
    if (error) return res.status(500).json({ message: "User Already Exists" });
    res.set("Access-Control-Allow-Origin", "*");
    const token = jwt.sign({ id: data.id }, "secretKey");
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200);
    return res
      .status(200)
      .json({ message: "Form data submitted successfully" });
  });
};
