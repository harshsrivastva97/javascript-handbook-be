import { Router } from "express";
import { LibraryController } from "../controllers/libraryController.js";

const router = Router();
const libraryController = new LibraryController();

router.get("/:user_id", libraryController.getLibraryTopics.bind(libraryController));
router.get("/", libraryController.getLibraryTopics.bind(libraryController));
router.get("/topic/:topic_id", libraryController.getTopicContentById.bind(libraryController));

export default router;