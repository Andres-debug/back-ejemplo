// Importamos bcrypt para hashear contraseñas de forma segura
import bcrypt from "bcryptjs";
// Importamos jsonwebtoken para generar tokens JWT
import jwt from 'jsonwebtoken';
// Importamos el modelo User para interactuar con la tabla users
import User from "../models/User.js";

// FUNCIÓN REGISTER: registra nuevos usuarios en el sistema
export const register = async (req,res)=>{
    try{
        // Extraemos los datos del cuerpo de la petición (destructuring)
        const {nombre,correo,password} = req.body;

        // DEBUG: verificamos qué datos están llegando
        console.log("Datos recibidos:", {nombre, correo, password: password ? "****" : "undefined"});

        // VALIDACIÓN: verificamos que todos los campos requeridos estén presentes
        if(!nombre || !correo || !password){
            return res.status(400).json({message: "Nombre,correo y password son requeridos"})
        }

        // VALIDACIÓN ADICIONAL: verificamos que password no esté vacío o sea solo espacios
        if(typeof password !== 'string' || password.trim().length === 0){
            return res.status(400).json({message: "Password debe ser una cadena válida no vacía"})
        }

        // VERIFICACIÓN DE DUPLICADOS: consultamos si el correo ya existe
        // SQL equivalente: SELECT * FROM users WHERE correo = ?
        const userExist = await User.findOne({where:{correo}})

        if(userExist){
            return res.status(400).json({message: "El correo ya existe"})
        }

        // SEGURIDAD: hasheamos la contraseña con bcrypt (salt de 10 rondas)
        const hashedPassword = await bcrypt.hash(password,10);

        // DEBUG: verificamos que el hash se generó correctamente
        console.log("Password hasheado exitosamente:", hashedPassword ? "Sí" : "No");

        // CREACIÓN: insertamos el nuevo usuario en la base de datos
        // SQL equivalente: INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)
        const newUser = await User.create({
            nombre: nombre.trim(),
            correo: correo.trim().toLowerCase(),
            password: hashedPassword
        })

        // SEGURIDAD: removemos la contraseña de la respuesta
        const userSafe = newUser.toJSON();
        delete userSafe.password;

        // Respuesta exitosa con status 201 (Created)
        return res.status(201).json({
            message: "Usuario registrado con exito",
            user: userSafe
        })

    }catch(error){
        // MANEJO DE ERRORES: capturamos cualquier error del servidor
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}

// FUNCIÓN LOGIN: autentica usuarios existentes
export const login = async (req,res)=>{
    try{
        // Extraemos credenciales del cuerpo de la petición
        const {correo,password} = req.body;

        // VALIDACIÓN: verificamos que las credenciales estén presentes
        if(!correo || !password){
            return res.status(400).json({message: "Correo y password son requeridos"})
        }

        // BÚSQUEDA: buscamos el usuario por correo
        // SQL equivalente: SELECT * FROM users WHERE correo = ?
        const user = await User.findOne({where:{correo}})

        if(!user){
            return res.status(400).json({message: "Usuario no encontrado"})
        }

        // AUTENTICACIÓN: comparamos la contraseña ingresada con el hash almacenado
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Contraseña incorrecta"})
        }

        // GENERACIÓN DE TOKEN: creamos JWT con datos del usuario
        const payload = {id:user.id, correo: user.correo};
        // Token expira en 1 hora por seguridad
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "1h"})

        // SEGURIDAD: removemos la contraseña de la respuesta
        const userSafe = user.toJSON();
        delete userSafe.password

        // Respuesta exitosa con usuario y token
        return res.json(
            {
                message:"Login exitoso",
                user:userSafe,
                token
            }
        )

    }catch(error){
        // MANEJO DE ERRORES: capturamos cualquier error del servidor
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}