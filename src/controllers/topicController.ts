import { Request, Response } from "express";
import { TopicService } from "../services/topicService.js";
import { sendResponse } from "../utils/response.js";

export class TopicController {
  private topicService: TopicService;

  constructor() {
    this.topicService = new TopicService();
  }

  async getAllTopics(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const response = await this.topicService.getAllTopics(user_id);
      sendResponse(res, response.status === 'success' ? 200 : 500, response);
    } catch (error: unknown) {
      sendResponse(res, 500, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch topics'
      });
    }
  }

  async getTopicContentById(req: Request, res: Response): Promise<void> {
    try {
      const { topic_id } = req.params;
      if (!topic_id) {
        sendResponse(res, 400, {
          status: 'error',
          message: 'Topic ID is required'
        });
        return;
      }
      const response = await this.topicService.getTopicContent(topic_id);
      sendResponse(res, response.status === 'success' ? 200 : 404, response);
    } catch (error: unknown) {
      sendResponse(res, 500, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch topic content'
      });
    }
  }
}