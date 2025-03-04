import { Schema, model } from 'mongoose';
import { Topic } from '../types/topics.js';

const TopicSchema = new Schema<Topic>({
    topic_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
});

export const TopicModel = model<Topic>('topicList', TopicSchema, 'topicList');