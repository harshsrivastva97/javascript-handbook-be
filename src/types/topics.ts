import { ProgressStatus } from "../enums/enums.js";

export interface TopicListSchema {
    topic_id: number;
    title: string;
    file_name: string;
}

export interface TopicListResponse extends TopicListSchema {
    status: ProgressStatus;
}

export interface TopicDetailsResponse {
    topic_id: number;
    title: string;
    content: string;
}
