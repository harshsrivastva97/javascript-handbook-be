import { Router } from "express";
import { BlogsController } from "../controllers/blogsController.js";

const router = Router();
const blogsController = new BlogsController();

router.get("/", blogsController.getBlogs.bind(blogsController));
router.get("/:blog_id", blogsController.getBlogById.bind(blogsController));

export default router;