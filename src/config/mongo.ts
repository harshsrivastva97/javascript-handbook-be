import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: 'javascript-handbook-db',
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};