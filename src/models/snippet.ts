import { Schema, model } from 'mongoose';
import { SnippetDocument } from '../types/snippet.js';

const SnippetSchema = new Schema<SnippetDocument>({
    snippet_id: { type: Number, required: true, unique: true },
    filename: { type: String, required: true },
    label: { type: String, required: true },
    difficulty: { type: String, required: true },
    is_locked: { type: Boolean, required: true },
    order: { type: Number, required: true },
});

export default model<SnippetDocument>('Snippet', SnippetSchema);