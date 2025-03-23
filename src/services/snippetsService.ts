import { readFile } from "fs/promises";
import SnippetModel from "../models/snippet.js";
import { SnippetDocument } from "../types/snippet.js";
import ProgressModel from "../models/progress.js";
import { ApiResponse } from "../utils/response.js";
import { ProgressStatus } from "../enums/enums.js";
import { ProgressSchema } from "../types/progress.js";
import { SnippetResponse, SnippetContent } from "../types/snippet.js";

export class SnippetService {
    static async getSnippets(user_id: string): Promise<ApiResponse<SnippetResponse[]>> {
        const snippets: SnippetResponse[] = await SnippetModel.find().lean();
        if (!user_id) {
            return {
                status: 'success',
                data: snippets,
                message: 'Snippets fetched successfully'
            };
        }
        const progressRecords: ProgressSchema[] = await ProgressModel.find({
            user_id,
            snippet_id: { $exists: true, $ne: null },
            topic_id: null
        });
        if (!progressRecords) {
            return {
                status: 'success',
                data: snippets,
                message: 'Snippets fetched successfully'
            };
        }
        const snippetsWithProgress: SnippetResponse[] = snippets.map((snippet) => ({
            ...snippet,
            status: progressRecords.find(rec => rec.snippet_id === snippet.snippet_id)?.status || ProgressStatus.PENDING
        }));
        return {
            status: 'success',
            data: snippetsWithProgress,
            message: 'Snippets fetched successfully'
        };
    }

    static async getSnippetById(snippetId: string): Promise<ApiResponse<SnippetContent>> {
        try {
            const snippet: SnippetDocument | null = await SnippetModel.findOne({ snippet_id: Number(snippetId) }).lean();
            if (!snippet) {
                return {
                    status: 'error',
                    error: `Snippet details not found`,
                    message: 'Snippet not found'
                };
            }

            const content: string = await readFile(`./src/files/snippets/${snippet.filename}.md`, "utf-8");
            return {
                status: 'success',
                data: {
                    snippet_id: snippet?.snippet_id,
                    label: snippet?.label,
                    content: content
                }
            };
        } catch (error: unknown) {
            return {
                status: 'error',
                error: error instanceof Error ? error.message : 'Failed to fetch snippet details',
                message: 'Failed to fetch snippet details'
            };
        }
    }
}

export default SnippetService;