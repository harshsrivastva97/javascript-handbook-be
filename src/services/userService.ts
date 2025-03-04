import pkg from '@prisma/client';
const { PrismaClient } = pkg;
type Users = pkg.Users;

const prisma = new PrismaClient();

interface UserProfile {
    user_id?: string,
    email?: string,
    display_name?: string,
    email_verified?: boolean,
    photo_url?: string,
    github?: string,
    linkedin?: string,
    x_link?: string,
    website_link?: string
}

export async function registerUser(userData: UserProfile): Promise<Users> {
    try {
        const user = await prisma.users.create({
            data: {
                user_id: userData.user_id!,
                email: userData.email!,
                display_name: userData.display_name!,
                email_verified: userData.email_verified ?? false,
                photo_url: userData.photo_url ?? null,
            }
        });
        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Registration failed");
    }
}

export async function getUserByUID(user_id: string): Promise<Users> {
    try {
        const user = await prisma.users.findUnique({
            where: { user_id }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User not found");
    }
}

export async function updateUserByUID(user_id: string, userData: UserProfile): Promise<Users> {
    try {
        const user = await prisma.users.update({
            where: { user_id },
            data: userData
        });
        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User not found");
    }
}
