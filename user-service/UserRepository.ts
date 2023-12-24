import { ObjectId } from 'mongodb';
import { getDatabase } from './utils';
import UserHistoryModel from "./UserHistoryModel";

class UserRepository {
    private db = getDatabase();

    createUser = async (username: string, balance: number) => {
        const user = {
            username,
            balance,
        };
        try {
            const userResult = await this.db.collection('users').insertOne(user);
            const userHistory = new UserHistoryModel(userResult.insertedId.toString(), []);
            const userHistoryResult = await this.db.collection('user-history').insertOne(userHistory);

            return !(!userResult || !userHistoryResult);
        } catch (e: any) {
            return console.error(e.message);
        }
    };

    getUser = async (userId: string) => {
        try {
            return this.db.collection('users').findOne({ _id: new ObjectId(userId) });
        } catch (e: any) {
            return console.error(e.message);
        }
    };
}

export default UserRepository;
