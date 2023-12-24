import {ObjectId} from 'mongodb';
import { getDatabase } from './utils';
import {TransactionHistory} from "./UserHistoryModel";

class TransactionRepository {
    private db = getDatabase();

    createTransaction = async (senderId: string, receiverId: string, amount: number) => {
        const transaction = {
            senderId: new ObjectId(senderId),
            receiverId: new ObjectId(receiverId),
            amount,
            timestamp: new Date(),
        };

        try {
            const result = await this.db.collection('transactions').insertOne(transaction);

        // Update sender and receiver balances
            await this.updateUserBalance(senderId, -amount);
            await this.updateUserBalance(receiverId, amount);

            return result;
        } catch(e: any) {
            console.error(e.message);
        }

    };

    updateHistoryTransaction = async (userId: string, transactionData: TransactionHistory) => {
        try {
            const userHistory = await this.db.collection('user-history').findOne({userId});

            if (!userHistory) {
                return false;
            }

            userHistory.transactions.push(transactionData);

           const res = await this.db.collection('user-history').updateOne(
                { userId: userHistory.userId },
                { $set: { transactions: userHistory.transactions } },
                { upsert: true }
            );

           if (!res) return false;

            const userHistory2 = await this.db.collection('user-history').findOne({userId});

            //todo used to show to in console the user history data after a successful transaction since no UI
            console.info('user-history',userHistory2)
            return true;
        }  catch(e: any) {
            console.error(e.message);
        }

    }

    getTransaction = async (transactionId: string) => {
        return this.db.collection('transactions').findOne({ _id: new ObjectId(transactionId) });
    };

    private updateUserBalance = async (userId: string, amount: number) => {
        await this.db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { balance: amount } }
        );
    };
}

export default TransactionRepository;
