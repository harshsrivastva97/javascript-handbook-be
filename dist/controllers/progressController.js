import prisma from "../config/database.js";
export async function updateProgress(req, res) {
    try {
        const { userId, topicId, progress } = req.body;
        if (!userId || !topicId || !progress) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const updatedProgress = await prisma.progress.upsert({
            where: {
                user_id_topic_id: { user_id: userId, topic_id: topicId },
            },
            update: {
                progress,
            },
            create: {
                user_id: userId,
                topic_id: topicId,
                progress,
            },
        });
        res.json({ message: "Progress updated successfully", updatedProgress });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update progress" });
    }
}
export async function getOverallProgress(req, res) {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const progressRecords = await prisma.progress.findMany({
            where: { user_id: userId },
            select: { progress: true },
        });
        if (progressRecords.length === 0) {
            res.json({ message: "No progress found for this user", overallProgress: "0%" });
            return;
        }
        const totalProgress = progressRecords.reduce((sum, record) => sum + parseFloat(record.progress), 0);
        const overallProgress = (totalProgress / progressRecords.length).toFixed(2) + "%";
        res.json({ overallProgress });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch overall progress" });
    }
}
