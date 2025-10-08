import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken';

import User from "../models/User.js";


export const register = async (req,res)=>{

    try{

         const {nombre,correo,password} = req.body;

         if(!nombre || !correo || !password){
            return res.status(400).json({message: "Nombre,correo y password son requeridos"})
         }

         const userExist = await User.findOne({where:{correo}})

         if(userExist){
            return res.status(400).json({message: "El correo ya existe"})
         }

         const hashedPassword = await bcrypt.hash(password,10);

         const newUser = await User.create({
            nombre,
            correo,
            password: hashedPassword
         })

         const userSafe = newUser.toJSON();
         delete userSafe.password;

         return res.status(201).json({
            message: "Usuario registrado con exito",
            user: userSafe
         })

    }catch(error){
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }

}


export const login = async (req,res)=>{

    try{

        const {correo,password} = req.body;

        if(!correo || !password){
            return res.status(400).json({message: "Correo y password son requeridos"})
        }

        const user = await User.findOne({where:{correo}})

        if(!user){
            return res.status(400).json({message: "Usuario no encontrado"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Contraseña incorrecta"})
        
        }

        const payload = {id:user.id, correo: user.correo};

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "1h"})

        const userSafe = user.toJSON();
        delete userSafe.password

        return res.json(
            {
                message:"Login exitoso",
                user:userSafe,
                token
            }
        )

    }catch(error){
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }


}