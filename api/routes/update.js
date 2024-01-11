import express from "express";
import { updateData } from "../controllers/update.js";

const router = express.Router();

router.post("/update", updateData);

export default router;
