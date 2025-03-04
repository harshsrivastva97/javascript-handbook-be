import { Request, Response } from "express";
import prisma from "../db/postgres.js";

interface UserProgressResponse {
    completedTopics: string[];
    overallProgress: number;
}

enum ProgressStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    PENDING = "PENDING"
}

export async function getUserProgressById(userId: string): Promise<UserProgressResponse> {
    try {
        const progressRecords = await prisma.userProgress.findMany({
            select: { topic_id: true },
            where: { user_id: userId, status: ProgressStatus.COMPLETED }
        });
        return {completedTopics: progressRecords.map(rec => rec.topic_id), overallProgress: progressRecords.length};
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch overall progress");
    }
}

export async function updateTopicStatus(userId: string, topicId: string, status: ProgressStatus): Promise<void> {
    try {
        await prisma.userProgress.upsert({
            where: {
                user_id_topic_id: { user_id: userId, topic_id: topicId },
            },
            update: {
                status,
            },
            create: {
                user_id: userId,
                topic_id: topicId,
                status,
            },
        });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update progress");
    }
}