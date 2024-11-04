import {Router} from 'express';
import { getUsuarios, getUsuarioById } from '../controllers/emplosyes.controllers.js';
const router = Router();

router.get('/get', getUsuarios);
router.get('/get/:id', getUsuarioById);

export default router;

