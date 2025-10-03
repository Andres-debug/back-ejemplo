import Post from "../models/Post.js";
import User from "../models/User.js";

// SELECT * FROM users;
export const getUsers = async (req, res) => {
  try {
    //Join de Post
    const users = await User.findAll({include:Post});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// INSERT INTO users (...)
export const createUser = async (req, res) => {
  try {
    const { nombre, correo } = req.body;

    const newUser = await User.create({ nombre, correo });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE users Set
export const updateUser = async(req,res)=>{
  try{
    const {id} = req.params;
    const{nombre,correo} = req.body

    await User.update({nombre,correo},{where:{id}})

    res.json({message:"Usuario actualizado"})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

//DELETE FROM users WHERE id=...

export const deleteUser = async (req,res)=>{
  try{
    const {id} = req.params;
    await User.destroy({where:{id}})
     res.json({message: "Usuario eliminado"})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}