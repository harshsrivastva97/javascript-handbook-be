import { Schema, model } from 'mongoose';
import { LibraryDocument } from '../types/library.js';

const LibrarySchema = new Schema<LibraryDocument>({
    topic_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    file_name: { type: String, required: true },
});

export default model<LibraryDocument>('library', LibrarySchema, 'library');