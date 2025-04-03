import { Request, Response } from "express";
import { LibraryService } from "../services/libraryService.js";
import { sendResponse } from "../utils/response.js";

export class LibraryController {
  private LibraryService: LibraryService;

  constructor() {
    this.LibraryService = new LibraryService();
  }

  async getLibraryTopics(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const response = await this.LibraryService.getLibrary(user_id);
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
      const response = await this.LibraryService.getTopicContent(topic_id);
      sendResponse(res, response.status === 'success' ? 200 : 404, response);
    } catch (error: unknown) {
      sendResponse(res, 500, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch topic content'
      });
    }
  }
}