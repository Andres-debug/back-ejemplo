import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

//SELECT con JOIN

export const getComments = async (req,res)=>{
    try{
        const comments = await Comment.findAll({
            include: {model:Post, attributes:["titulo"]}
        })
        res.json(comments)
    }catch(eror){
        res.status(500).json({error: error.message})
    }
}

//INSERT

export const createComment = async (req,res)=>{
    try{
        const {texto,postId} = req.body
        const comment = await Comment.create({texto, postId})
        res.json(comment)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}