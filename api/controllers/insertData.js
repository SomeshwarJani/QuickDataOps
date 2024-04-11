import { connection } from "../connect.js";
import jwt from "jsonwebtoken";

export const insertData = (req, res) => {
  const { name, sector_id, term } = req.body;
  const q = `INSERT INTO user_details(name, sector_id, term) VALUES (?,?,?);`;
  connection.query(q, [name, sector_id, term], (error, data) => {
    if (error) return res.status(500).json({ message: "User Already Exists" });
    res.set("Access-Control-Allow-Origin", "*");
    const token = jwt.sign({ id: data.id }, "secretKey");
    res.set("Access-Control-Allow-Origin", "https://quickdataops.vercel.app");
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
