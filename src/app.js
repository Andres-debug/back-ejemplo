import express from "express";

import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);

export default app;
