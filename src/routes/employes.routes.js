import { Router } from "express";
import { postUsuario, deleteUsuario, putUsuario } from "../controllers/emplosyes.controllers.js";

const router = Router();

// Endpoints
router.post("/post", postUsuario);
router.put("/put", putUsuario);
router.delete("/delete/:id", deleteUsuario);

export default router;
