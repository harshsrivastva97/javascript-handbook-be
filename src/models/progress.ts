import { Schema, model } from "mongoose";
import { ProgressSchema } from "../types/progress.js";

const progressSchema = new Schema<ProgressSchema>({
    progress_id: { type: Number, required: true },
    user_id: { type: String, required: true },
    topic_id: { type: Number, required: false },
    snippet_id: { type: Number, required: false },
    status: { type: String, required: true },
});

export default model("Progress", progressSchema, "progress");