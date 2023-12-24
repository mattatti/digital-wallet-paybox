// init-database.ts

import { MongoClient } from 'mongodb';
import { getDatabase } from './common/utils';

const initializeDatabase = async () => {
    const client = getDatabase();
    try {
        const db = client.db();

        // Create collections if they don't exist
        await db.createCollection('users');
        await db.createCollection('transactions');
        await db.createCollection('notifications');
        await db.createCollection('user-history');

        console.log('Collections initialized successfully.');
    } finally {
        // Close the MongoDB connection after initialization
        await client.close();
    }
};

initializeDatabase().catch((error) => {
    console.error('Error during database initialization:', error);
});
