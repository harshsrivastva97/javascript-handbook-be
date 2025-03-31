import { Schema, model } from 'mongoose';
import { BlogDocument } from '../types/blogs.js';

const BlogSchema = new Schema<BlogDocument>({
    blog_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    filename: { type: String, required: true },
});

export default model<BlogDocument>('Blog', BlogSchema);