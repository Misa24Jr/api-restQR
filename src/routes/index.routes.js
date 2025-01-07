import {Router} from 'express';
import { getUsuarios } from '../controllers/emplosyes.controllers.js';
import { postUsuario } from "../controllers/emplosyes.controllers.js";
const router = Router();

router.post("/post", postUsuario);
router.get('/get', getUsuarios);

export default router;

