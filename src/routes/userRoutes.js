// Importamos Router de Express para crear rutas modulares
import { Router } from "express";

// Importamos todas las funciones del controlador de usuarios
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";

// Creamos una instancia del router para agrupar rutas relacionadas
const router = Router();

// RUTA GET: obtener todos los usuarios
// Endpoint: GET /api/user
// Función: lista todos los usuarios con sus posts relacionados
router.get("/", getUsers);

// RUTA POST: crear nuevo usuario
// Endpoint: POST /api/user
// Body esperado: { "nombre": "Juan", "correo": "juan@email.com" }
// Función: crea un usuario básico (sin password)
router.post("/", createUser);

// RUTA PUT: actualizar usuario existente
// Endpoint: PUT /api/user/:id (ejemplo: PUT /api/user/123)
// Parámetro de ruta: id del usuario a actualizar
// Body esperado: { "nombre": "Juan Carlos", "correo": "nuevo@email.com" }
router.put("/:id",updateUser)

// RUTA DELETE: eliminar usuario
// Endpoint: DELETE /api/user/:id (ejemplo: DELETE /api/user/123)
// Parámetro de ruta: id del usuario a eliminar
// Función: elimina permanentemente el usuario de la base de datos
router.delete("/:id",deleteUser)

// Exportamos el router para usarlo en app.js
export default router;
