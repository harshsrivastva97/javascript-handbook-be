import { ProgressService } from "./progressService.js";
import { ProgressStatus } from "../enums/enums.js";
import type { TopicResponse, LibraryDocument } from "../types/library.js";
import { readFile } from 'fs/promises';
import { ApiResponse } from "../utils/response.js";
import LibraryModel from "../models/library.js";

export class LibraryService {
  private progressService: ProgressService;

  constructor() {
    this.progressService = new ProgressService();
  }

  async getLibrary(user_id?: string): Promise<ApiResponse<LibraryDocument[]>> {
    try {
      const topics = await LibraryModel.find().lean();

      if (!user_id) {
        const topicsWithDefaultStatus = topics.map((topic) => ({
          ...topic,
          status: ProgressStatus.PENDING,
        }));

        return {
          status: 'success',
          data: topicsWithDefaultStatus,
          message: 'Topics fetched successfully'
        };
      }

      const [, userProgress] = await Promise.all([
        Promise.resolve(topics),
        this.progressService.getUserProgressById(user_id),
      ]);

      const topicsWithStatus = topics.map((topic) => ({
        ...topic,
        status: ProgressStatus.PENDING,
      }));

      userProgress.data?.progressRecords.forEach((rec) => {
        const topic = topicsWithStatus.find((t) => t.topic_id === rec.topic_id);
        if (topic) {
          topic.status = rec.status as ProgressStatus;
        }
      });

      return {
        status: 'success',
        data: topicsWithStatus,
        message: 'Topics fetched successfully'
      };
    } catch (error: unknown) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to fetch topics',
        message: 'Failed to fetch topics'
      };
    }
  }

  async getTopicContent(topic_id: string): Promise<ApiResponse<TopicResponse>> {
    try {
      const topic: LibraryDocument | null = await LibraryModel.findOne({ topic_id: Number(topic_id) }).lean();
      if (!topic) {
        return {
          status: 'error',
          error: `Topic details not found`,
          message: 'Topic not found'
        };
      }

      const content: string = await readFile(`./src/files/library/${topic.file_name}.md`, "utf-8");
      return {
        status: 'success',
        data: {
          topic_id: topic?.topic_id,
          title: topic?.title,
          content: content
        }
      };
    } catch (error: unknown) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to fetch topic details',
        message: 'Failed to fetch topic details'
      };
    }
  }
}