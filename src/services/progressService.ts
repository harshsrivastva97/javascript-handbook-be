import prisma from "../db/postgres.js";
import { ProgressStatus } from "../enums/enums.js";
import { UserProgress } from "../types/index.js";
import { ApiResponse } from "./topicService.js";

export class ProgressService {
    async getUserProgressById(userId: string): Promise<ApiResponse<{ progressRecords: { topic_id: number, status: string }[] }>> {
        try {
            const progressRecords = await prisma.userProgress.findMany({
                select: { topic_id: true, status: true },
                where: { user_id: userId }
            });
            return {
                status: 'success',
                data: {
                    progressRecords: progressRecords.map(rec => {
                        const numericTopicId = Number(rec.topic_id);
                        if (isNaN(numericTopicId)) {
                            throw new Error(`Invalid topic ID format in progress records: ${rec.topic_id}`);
                        }
                        return {
                            topic_id: numericTopicId,
                            status: rec.status
                        };
                    })
                },
                message: 'Progress records fetched successfully'
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to fetch overall progress");
        }
    }

    async updateTopicStatus(userId: string, topicId: number, status: ProgressStatus): Promise<ApiResponse<UserProgress>> {
        try {
            if (!userId || !topicId || !status) {
                throw new Error("Missing required parameters");
            }

            const result = await prisma.userProgress.upsert({
                where: {
                    user_id_topic_id: { 
                        user_id: userId, 
                        topic_id: topicId 
                    },
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

            return {
                status: 'success',
                data: result,
                message: 'Progress updated successfully'
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to update topic status");
        }
    }

    async resetUserProgressByUserId(userId: string): Promise<ApiResponse<void>> {
        try {
            await prisma.userProgress.deleteMany({
                where: { user_id: userId }
            });
            return {
                status: 'success',
                message: 'User progress reset successfully'
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to reset user progress");
        }
    }
}