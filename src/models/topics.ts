import { Schema, model } from 'mongoose';
import { Topic, TopicDetails } from '../types/topics.js';

const TopicSchema = new Schema<Topic>({
    topic_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
});

const TopicDetailsSchema = new Schema<TopicDetails>({
    topic_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    code_example: { type: String, required: true },
    key_points: { type: [String], required: true },
});

export const TopicModel = model<Topic>('topicList', TopicSchema, 'topicList');
export const TopicDetailsModel = model<TopicDetails>('topicDetails', TopicDetailsSchema, 'topicDetails');

