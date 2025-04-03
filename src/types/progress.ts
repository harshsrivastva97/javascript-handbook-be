import { Document } from "mongoose";
import { ProgressStatus } from "../enums/enums.js";

export interface ProgressSchema extends Document {
    progress_id: number;
    user_id: string;
    topic_id?: number;
    snippet_id?: number;
    status: ProgressStatus;
}