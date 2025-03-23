import { Document } from "mongoose";
import { ProgressStatus } from "../enums/enums.js";

export interface LibraryDocument extends Document {
    topic_id: number;
    title: string;
    file_name: string;
}

export interface LibraryResponse extends LibraryDocument {
    status: ProgressStatus;
}

export interface TopicResponse {
    topic_id: number;
    title: string;
    content: string;
}
