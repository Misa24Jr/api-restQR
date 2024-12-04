import {Router} from 'express';
import { getUsuarios } from '../controllers/emplosyes.controllers.js';
const router = Router();

router.get('/get', getUsuarios);

export default router;

