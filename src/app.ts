import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('Server is running!');
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);

export default app;