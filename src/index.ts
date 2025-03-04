// src/index.ts
import dotenv from "dotenv";
import app from "./app.js";
import { PrismaClient } from "@prisma/client";
import { connectMongoDB } from "./db/mongo.js";

dotenv.config();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 9000;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("PostgreSQL connected successfully");

        await connectMongoDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();