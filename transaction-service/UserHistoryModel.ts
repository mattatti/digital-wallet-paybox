// UserHistoryModel.ts

export interface TransactionHistory {
    label: 'sent' | 'received';
    senderId: string;
    receiverId: string;
    amount: number;
    timestamp: Date;
}

class UserHistoryModel {
    userId: string;
    transactions: TransactionHistory[];

    constructor(userId: string, transactions: TransactionHistory[] = []) {
        this.userId = userId;
        this.transactions = transactions;
    }

    addTransaction(transaction: TransactionHistory) {
        this.transactions.push(transaction);
    }

    // Other methods as needed
}

export default UserHistoryModel;
