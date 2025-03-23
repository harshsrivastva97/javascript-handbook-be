// src/index.ts
import dotenv from "dotenv";
import app from "./app.js";
import { connectMongoDB } from "./config/mongo.js";

dotenv.config();

const PORT = process.env.PORT || 9000;

const startServer = async () => {
    try {
        await connectMongoDB();
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();