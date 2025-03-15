import { TopicModel } from "../models/topics.js";
import { ProgressService } from "./progressService.js";
import { ProgressStatus } from "../enums/enums.js";
import type { TopicListSchema, TopicDetailsResponse } from "../types/topics.js";
import { readFile } from 'fs/promises';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
}

export class TopicService {
  private progressService: ProgressService;

  constructor() {
    this.progressService = new ProgressService();
  }

  async getAllTopics(user_id?: string): Promise<ApiResponse<TopicListSchema[]>> {
    try {
      // First, fetch all topics
      const topics = await TopicModel.find().lean();
      
      // If user_id is not provided, return all topics with default PENDING status
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
      
      // If user_id is provided, fetch progress and update statuses
      const [, userProgress] = await Promise.all([
        Promise.resolve(topics), // Already fetched topics above
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

  async getTopicContent(topic_id: string): Promise<ApiResponse<TopicDetailsResponse>> {
    try {
      const topic: TopicListSchema | null = await TopicModel.findOne({ topic_id: Number(topic_id) }).lean();
      if (!topic) {
        return {
          status: 'error',
          error: `Topic details not found`,
          message: 'Topic not found'
        };
      }

      const content: string = await readFile(`./src/markdown_files/topics/${topic.file_name}.md`, "utf-8");
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