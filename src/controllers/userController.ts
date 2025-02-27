import type { Request, Response } from 'express';
import { registerUser, getUserByUID, updateUserByUID } from '../services/userService.js';

export async function registerNewUser(req: Request, res: Response): Promise<void> {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            message: 'User registered',
            user
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}

export async function getUserProfile(req: Request, res: Response): Promise<void> {
    try {
        const uid = req.params.uid;
        const user = await getUserByUID(uid);
        res.status(200).json({ message: 'User found', user });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}

export async function updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
        const uid = req.params.uid;
        const user = await updateUserByUID(uid, req.body);
        res.status(200).json({ message: 'User updated', user });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}