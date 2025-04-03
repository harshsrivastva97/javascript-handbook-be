import { Document } from "mongoose";

export interface UserSchema extends Document {
    user_id: string;
    email: string;
    username?: string;
    display_name: string;
    email_verified: boolean;
    photo_url?: string;
    github?: string;
    linkedin?: string;
    x_link?: string;
    website?: string;
    organization?: string;
    created_at: Date;
  }
  
  export interface UserProfile {
    user_id?: string;
    email?: string;
    display_name?: string;
    email_verified?: boolean;
    photo_url?: string;
    github?: string;
    linkedin?: string;
    x_link?: string;
    website?: string;
    organization?: string;
  }