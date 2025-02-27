import { PrismaClient, Users } from '@prisma/client';

const prisma = new PrismaClient();

interface UserProfile {
    uid?: string,
    email?: string,
    display_name?: string,
    email_verified?: boolean,
    photo_url?: string,
    provider_id?: string,
    github?: string,
    linkedin?: string,
    x_link?: string,
    website_link?: string
}

export async function registerUser(userData: UserProfile): Promise<Users> {
    try {
        const user = await prisma.users.create({
            data: {
                uid: userData.uid,
                email: userData.email,
                display_name: userData.display_name,
                email_verified: userData.email_verified,
                photo_url: userData.photo_url,
                provider_id: userData.provider_id
            }
        });
        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Registration failed");
    }
}

export async function getUserByUID(uid: string): Promise<Users> {
    try {
        const user = await prisma.users.findUnique({
            where: { uid }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User not found");
    }
}

export async function updateUserByUID(uid: string, userData: UserProfile): Promise<Users> {
    try {
        const user = await prisma.users.update({
            where: { uid },
            data: userData
        });
        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "User not found");
    }
}
