import express from "express";
import { getUserDetails } from "../controllers/userdetails.js";

const router = express.Router();

router.get("/userdata", getUserDetails);

export default router;
