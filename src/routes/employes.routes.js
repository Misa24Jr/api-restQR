import { Router } from "express";
import { postUsuario } from "../controllers/emplosyes.controllers.js";

const router = Router();

// Endpoints
router.post("/post", postUsuario);

export default router;
