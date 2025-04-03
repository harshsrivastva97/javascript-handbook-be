import { BlogsService } from "../services/blogsService.js";
import { Request, Response } from "express";
import { sendResponse } from "../utils/response.js";

export class BlogsController {
    async getBlogs(req: Request, res: Response) {
        const blogs = await BlogsService.getBlogs();
        sendResponse(res, 200, {
            status: "success",
            data: blogs
        });
    }

    async getBlogById(req: Request, res: Response) {
        const blogId = req.params.blog_id;
        const blog = await BlogsService.getBlogById(blogId);
        sendResponse(res, 200, {
            status: "success",
            data: blog
        });
    }
}

export default BlogsController;