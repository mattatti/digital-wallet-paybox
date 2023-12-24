import { MongoClient } from 'mongodb';
import { MONGO_URL } from './constants';

export let db: MongoClient;

export const getDatabase = () => {
    if (!db) {
        db = new MongoClient(MONGO_URL);
        db.connect().catch(console.error);
    }
    return db;
};
