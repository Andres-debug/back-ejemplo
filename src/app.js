import express from "express";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

export default app;
