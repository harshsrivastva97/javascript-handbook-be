import ProgressModel from "../models/progress.js";
import { ProgressStatus } from "../enums/enums.js";
import { ProgressSchema } from "../types/progress.js";
import { ApiResponse } from "../utils/response.js";
export class ProgressService {
    async getUserProgressById(userId: string): Promise<ApiResponse<{ progressRecords: { topic_id: number, status: string }[] }>> {
        try {
            const progressRecords = await ProgressModel.find({ user_id: userId });
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

    async updateTopicStatus(userId: string, topicId: number, status: ProgressStatus): Promise<ApiResponse<ProgressSchema>> {
        try {
            if (!userId || !topicId || !status) {
                throw new Error("Missing required parameters");
            }

            await ProgressModel.findOneAndUpdate(
                { user_id: userId, topic_id: topicId },
                { $set: { status } },
                { upsert: true, new: true }
            );

            return {
                status: 'success',
                message: 'Progress updated successfully'
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to update topic status");
        }
    }

    async resetUserProgressByUserId(userId: string): Promise<ApiResponse<void>> {
        try {
            await ProgressModel.deleteMany({ user_id: userId });
            return {
                status: 'success',
                message: 'User progress reset successfully'
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to reset user progress");
        }
    }
}