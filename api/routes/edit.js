import express from "express";
import { editData } from "../controllers/edit.js";

const router = express.Router();

router.get("/edit/:id", editData);

export default router;
