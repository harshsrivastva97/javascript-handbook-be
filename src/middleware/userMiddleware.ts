import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface DecodedToken {
    userId: number;
}

declare module 'express' {
    interface Request {
        user?: { userId: number };
    }
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
}