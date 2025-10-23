import { Router } from "express";

import {
    createAccount,
    getAccounts
} from "../controllers/cuentaController.js"

const router = Router();

router.post("/Crear", createAccount)
router.get("/Obtener", getAccounts)

export default router;