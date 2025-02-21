import type { Request, Response } from 'express';
import { register } from '../services/userService.js';

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;
        const user = await register(email);
        res.status(201).json({
            message: 'User registered',
            user
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}