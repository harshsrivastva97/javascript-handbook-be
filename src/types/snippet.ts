import { ProgressStatus } from "../enums/enums.js";

export interface SnippetDocument {
    snippet_id: number;
    filename: string;
    label: string;
    difficulty: string;
    is_locked: boolean;
    order: number;
}

export interface SnippetResponse extends SnippetDocument {
    status?: ProgressStatus;
}

export interface SnippetContent {
    snippet_id: number;
    label: string;
    content: string;
}