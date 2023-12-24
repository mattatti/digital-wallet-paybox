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


