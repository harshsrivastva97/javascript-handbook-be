import { Request, Response } from "express";
import SnippetService from "../services/snippetsService.js";

export class SnippetController {
    async getSnippets(req: Request, res: Response) {
        const { user_id } = req.params;
        const snippets = await SnippetService.getSnippets(user_id);
        res.json(snippets);
    }

    async getSnippetById(req: Request, res: Response) {
        const snippetId = req.params.snippet_id;
        const snippet = await SnippetService.getSnippetById(snippetId);
        res.json(snippet);
    }
}

export default SnippetController;