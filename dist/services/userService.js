import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function register(email) {
    try {
        const user = await prisma.users.create({
            data: { email, username: email.split('@')[0] }
        });
        return { user };
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Registration failed");
    }
}
