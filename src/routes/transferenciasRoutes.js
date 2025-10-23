import express from 'express';
import { realizarTransferencia } from '../controllers/TransferenciaController.js';

const router = express.Router();

router.post("/transferir", realizarTransferencia)

export default router;
