import pkg from '@prisma/client';
const { PrismaClient } = pkg;
type Users = pkg.Users;

const prisma = new PrismaClient();

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
}

interface UserProfile {
  user_id?: string;
  email?: string;
  display_name?: string;
  email_verified?: boolean;
  photo_url?: string;
  github?: string;
  linkedin?: string;
  x_link?: string;
  website_link?: string;
}

export class UserService {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async registerUser(userData: UserProfile): Promise<ApiResponse<Users>> {
    try {
      const user = await this.prisma.users.create({
        data: {
          user_id: userData.user_id!,
          email: userData.email!,
          display_name: userData.display_name!,
          email_verified: userData.email_verified ?? false,
          photo_url: userData.photo_url ?? null,
        },
      });
      return { status: 'success', data: user, message: 'User registered successfully' };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Registration failed',
        message: 'Failed to register user',
      };
    }
  }

  async getUserByUID(user_id: string): Promise<ApiResponse<Users>> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { user_id },
      });
      if (!user) {
        return { status: 'error', error: 'User not found', message: 'User not found' };
      }
      return { status: 'success', data: user, message: 'User fetched successfully' };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'User not found',
        message: 'Failed to fetch user',
      };
    }
  }

  async updateUserByUID(user_id: string, userData: UserProfile): Promise<ApiResponse<Users>> {
    try {
      const user = await this.prisma.users.update({
        where: { user_id },
        data: userData,
      });
      return { status: 'success', data: user, message: 'User updated successfully' };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'User not found',
        message: 'Failed to update user',
      };
    }
  }
}