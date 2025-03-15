import { Schema, model } from 'mongoose';
import { TopicListSchema } from '../types/topics.js';

const TopicSchema = new Schema<TopicListSchema>({
    topic_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    file_name: { type: String, required: true },
});

export const TopicModel = model<TopicListSchema>('topicList', TopicSchema, 'topicList');