import BlogModel from "../models/blogs.js";
import { ApiResponse } from "../utils/response.js";
import { BlogDocument, BlogListResponse, BlogContent } from "../types/blogs.js"
import fs from 'fs/promises';
import path from 'path';

export class BlogsService {
    static async getBlogs(): Promise<ApiResponse<BlogListResponse[]>> {
        const blogs: BlogDocument[] = await BlogModel.find().lean();
        const blogsWithoutFilename = blogs.map(({ filename, ...rest }) => rest);
        return {
            status: "success",
            data: blogsWithoutFilename,
            message: "Blogs fetched successfully"
        };
    }

    static async getBlogById(blogId: string): Promise<ApiResponse<BlogContent>> {
        const blog = await BlogModel.findOne({ blog_id: blogId }).lean();
        if (!blog) {
            return {
                status: "error",
                message: "Blog not found"
            };
        }

        const content = await fs.readFile(
            path.join(process.cwd(), 'src/files/blogs', `${blog.filename}.md`),
            'utf-8'
        );

        return {
            status: "success",
            data: {
                blog_id: blog.blog_id,
                title: blog.title,
                content
            },
            message: "Blog fetched successfully"
        };
    }
}

export default BlogsService;