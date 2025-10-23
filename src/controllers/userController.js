// Importamos el modelo Post para hacer JOIN con usuarios
import Post from "../models/Post.js";
// Importamos el modelo User para operaciones CRUD
import User from "../models/User.js";

// FUNCIÓN GETUSERS: obtiene todos los usuarios con sus posts relacionados
// SQL equivalente: SELECT * FROM users LEFT JOIN posts ON users.id = posts.userId;
export const getUsers = async (req, res) => {
  try {
    // CONSULTA CON JOIN: findAll con include hace un LEFT JOIN automáticamente
    // Retorna usuarios con array de posts en cada usuario
    const users = await User.findAll({include:Post});
    
    // Respuesta exitosa con todos los usuarios y sus posts
    res.json(users);
  } catch (error) {
    // MANEJO DE ERRORES: captura errores de base de datos
    res.status(500).json({ error: error.message });
  }
};

// FUNCIÓN CREATEUSER: crea un nuevo usuario (CRUD básico sin password)
// SQL equivalente: INSERT INTO users (nombre, correo) VALUES (?, ?);
export const createUser = async (req, res) => {
  try {
    // EXTRACCIÓN DE DATOS: obtenemos solo nombre y correo del body
    const { nombre, correo } = req.body;

    // CREACIÓN: insertamos nuevo usuario en la base de datos
    // NOTA: Esta función NO incluye password (es para CRUD básico)
    // Para registro con autenticación usar authController.register()
    const newUser = await User.create({ nombre, correo });
    
    // Respuesta exitosa con status 201 (Created)
    res.status(201).json(newUser);
  } catch (error) {
    // MANEJO DE ERRORES: captura errores como violación de unique constraint
    res.status(500).json({ error: error.message });
  }
};

// FUNCIÓN UPDATEUSER: actualiza datos de un usuario existente
// SQL equivalente: UPDATE users SET nombre=?, correo=? WHERE id=?;
export const updateUser = async(req,res)=>{
  try{
    // EXTRACCIÓN DE PARÁMETROS: obtenemos id de la URL
    const {id} = req.params;
    // EXTRACCIÓN DE DATOS: obtenemos los campos a actualizar del body
    const{nombre,correo} = req.body

    // ACTUALIZACIÓN: modificamos el registro que coincida con el id
    // Primer parámetro: campos a actualizar
    // Segundo parámetro: condición WHERE
    await User.update({nombre,correo},{where:{id}})

    // Respuesta de confirmación
    res.json({message:"Usuario actualizado"})
  }catch(error){
    // MANEJO DE ERRORES: captura errores como id inexistente
    res.status(500).json({error: error.message})
  }
}

// FUNCIÓN DELETEUSER: elimina un usuario de la base de datos
// SQL equivalente: DELETE FROM users WHERE id=?;
export const deleteUser = async (req,res)=>{
  try{
    // EXTRACCIÓN DE PARÁMETROS: obtenemos id de la URL (/api/user/123)
    const {id} = req.params;
    
    // ELIMINACIÓN: borramos el registro que coincida con el id
    // destroy() elimina permanentemente el registro
    await User.destroy({where:{id}})
    
    // Respuesta de confirmación
     res.json({message: "Usuario eliminado"})
  }catch(error){
    // MANEJO DE ERRORES: captura errores como restricciones de FK
    res.status(500).json({error: error.message})
  }
}