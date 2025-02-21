import { register, login, loginWithGoogle } from '../services/auth.service.js';
export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        const userCredential = await register(email, password);
        res.status(201).json({
            message: 'User registered',
            user: userCredential.user
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const userCredential = await login(email, password);
        res.json({
            token: await userCredential.user.getIdToken(),
            user: userCredential.user
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}
export async function googleLogin(req, res) {
    try {
        const userCredential = await loginWithGoogle();
        res.json({
            token: await userCredential.user.getIdToken(),
            user: userCredential.user
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ error: errorMessage });
    }
}
