import prisma from "../config/database.js";
export async function getAllTopics() {
    const topics = await prisma.topics.findMany();
    return topics;
}
