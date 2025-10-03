import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

//Modelo Post

const Post = sequelize.define("Post",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    contenido:{
        type: DataTypes.TEXT,
        allowNull:false
    }
},{
    tableName:"posts",
    timestamps: true
}
)

//Relaciones

User.hasMany(Post, {foreignKey:"userId"});
Post.belongsTo(User,{foreignKey:"userId"})

export default Post;