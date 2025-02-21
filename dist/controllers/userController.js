import { register } from '../services/userService.js';
export async function registerUser(req, res) {
    try {
        const { email } = req.body;
        const user = await register(email);
        res.status(201).json({
            message: 'User registered',
            user
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}
