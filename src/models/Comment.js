import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Post from "./Post.js";

const Comment = sequelize.define("Comment",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
     },
     texto:{
        type:DataTypes.STRING,
        allowNull: false
     }
},{
    tableName:"comments",
    timestamps:true
})

//Relaciones
Post.hasMany(Comment,{foreignKey:"postId"})
Comment.belongsTo(Post,{foreignKey:"postId"})

export default Comment;