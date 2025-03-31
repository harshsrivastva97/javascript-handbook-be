import type { Request, Response } from 'express';
import { UserService } from '../services/userService.js';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async registerNewUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            res.status(400).json({ error: errorMessage });
        }
    }
    
    async getUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const user = await this.userService.getUserByUID(uid);
            res.status(200).json(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            res.status(400).json({ error: errorMessage });
        }
    }
    
    async updateUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.updateUserByUID(req.body);
            res.status(200).json(user);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            res.status(400).json({ error: errorMessage });
        }
    }
}

