import { MongoClient } from 'mongodb';
import { MONGO_URL } from '../common/constants';

let db: MongoClient;

export const getDatabase = () => {
    if (!db) {
        db = new MongoClient(MONGO_URL, {  });
        db.connect().catch(console.error);
    }
    return db.db();
};

export const sendNotification = (userId: string, message: string) => {
    // Implement your notification logic here
    console.log(`Notification sent to user ${userId}: ${message}`);
};
