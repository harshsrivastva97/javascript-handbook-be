export interface BlogDocument {
    blog_id: number;
    title: string;
    description: string;
    filename: string;
    tags: string[];
}

export interface BlogListResponse {
    blog_id: number;
    title: string;
    description: string;
    tags: string[];
}

export interface BlogContent {
    blog_id: number;
    title: string;
    content: string;
}