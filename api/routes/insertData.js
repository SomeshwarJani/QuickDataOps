import express from "express";
import { insertData } from "../controllers/insertData.js";

const router = express.Router();

router.post("/submit", insertData);

export default router;
