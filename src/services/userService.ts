import UserModel from "../models/users.js";
import { ApiResponse } from "../utils/response.js";
import { UserProfile, UserSchema } from '../types/users.js'

export class UserService {
  async registerUser(userData: UserProfile): Promise<ApiResponse<UserSchema>> {
    try {
      const user = await UserModel.create({
        user_id: userData.user_id!,
        display_name: userData.display_name!,
        email_verified: userData.email_verified ?? false,
        photo_url: userData.photo_url ?? null,
        created_at: new Date(),
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

  async getUserByUID(user_id: string): Promise<ApiResponse<UserSchema>> {
    try {
      const user = await UserModel.findOne({ user_id });
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

  async updateUserByUID(userData: UserProfile): Promise<ApiResponse<UserSchema>> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { user_id: userData.user_id },
        userData,
        { new: true }
      );
      
      if (!user) {
        return { status: 'error', error: 'User not found', message: 'User not found' };
      }
      
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