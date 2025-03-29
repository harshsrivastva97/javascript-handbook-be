import { Router } from "express";
import SnippetController from "../controllers/snippetsController.js";

const router = Router();
const snippetController = new SnippetController();

router.get("/:user_id", snippetController.getSnippets.bind(snippetController));
router.get("/snippet/:snippet_id", snippetController.getSnippetById.bind(snippetController));

export default router;