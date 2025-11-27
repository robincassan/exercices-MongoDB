import express from "express";
import { createLivre, getLivres } from "../controllers/livreController.js";

const router = express.Router();

router.get("/", getLivres);
router.post("/", createLivre);

export default router;
