import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import snippetRoutes from "./routes/snippetRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('Server is running!');
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/questions", questionRoutes);

export default app;