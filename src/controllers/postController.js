import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

//SELECT con JOIN
export const getPosts = async(req,res)=>{
    try{
        const posts = await Post.findAll({
        
            include:[
                {model:User, attributes:["nombre","correo"]},
                {model:Comment, attributes:["texto"]},
            ]
        });
        res.json(posts)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//INSERT

export const createPost = async(req,res)=>{
    try{
        const {titulo, contenido, userId} = req.body;
        const post = await Post.create({titulo,contenido,userId})
        res.json(post)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}