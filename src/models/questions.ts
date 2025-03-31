import { Schema, model } from "mongoose";
import { Difficulty } from "../enums/enums.js";

const questionSchema = new Schema({
    question_id: { type: Number, required: true, unique: true },
    type: {
        type: String,
        required: true,
        enum: ['multiple-choice', 'true-false', 'fill-in-the-blank', 'code-output', 'match-pairs']
    },
    topic: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: [Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED]
    },
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: Schema.Types.Mixed, required: true },
    explanation: { type: String, required: true },
    pairs: [{
        left: { type: String },
        right: { type: String }
    }]
});

export const Question = model("Question", questionSchema);
