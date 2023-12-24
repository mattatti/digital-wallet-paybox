import * as amqp from 'amqplib';
import TransactionRepository from './TransactionRepository';
import {RABBITMQ_URL} from "../common/constants";
import UserHistory, {TransactionHistory} from "./UserHistoryModel";
import {Transaction} from "mongodb";

class TransactionService {
    private channel: amqp.Channel | undefined;
    private transactionRepository: TransactionRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.initMQ().catch(console.error);
    }

    createTransaction = async (senderId: string, receiverId: string, amount: number) => {
        const result = this.transactionRepository.createTransaction(senderId, receiverId, amount);
        if (this.channel) {
            this.channel.sendToQueue('transactions', Buffer.from(JSON.stringify({
                senderId,
                receiverId,
                amount,
            })));
        }

        // Update UserHistory collection for sender
       const senderResult = await this.updateUserHistory(senderId, {
            label: 'sent',
            senderId,
            receiverId,
            amount,
            timestamp: new Date(),
        });

        if (!senderResult) return false;

        // Update UserHistory collection for receiver
        const receiverResult = await this.updateUserHistory(receiverId, {
            label: 'received',
            senderId,
            receiverId,
            amount,
            timestamp: new Date(),
        });

        if (!receiverResult) return false;

        return result
    };

    getTransaction = async (transactionId: string) => {
        return this.transactionRepository.getTransaction(transactionId);
    };

    private async updateUserHistory(userId: string, transactionData: TransactionHistory) {
        try {
           return this.transactionRepository.updateHistoryTransaction(userId, transactionData);

        } catch (error: any) {
            console.error('Error updating UserHistory:', error.message);
        }
    }

    private async initMQ() {
        const connection = await amqp.connect(RABBITMQ_URL);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue('transactions');

        // Other initialization logic for RabbitMQ
    }
}

export default TransactionService;
