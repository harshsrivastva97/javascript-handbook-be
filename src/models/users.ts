import { Schema, model } from "mongoose";
import { UserSchema } from "../types/users.js";

const userSchema = new Schema<UserSchema>({
    user_id: { type: String, required: true },
    display_name: { type: String, required: false },
    username: { type: String, required: false },
    organization: { type: String, required: false },
    email: { type: String, required: false },
    email_verified: { type: Boolean, required: false },
    photo_url: { type: String, required: false },
    github: { type: String, required: false },
    linkedin: { type: String, required: false },
    x_link: { type: String, required: false },
    website: { type: String, required: false },
    created_at: { type: Date, required: true }
});

export default model<UserSchema>("users", userSchema, "users");