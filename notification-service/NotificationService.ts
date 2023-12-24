import * as amqp from 'amqplib';
import {RABBITMQ_URL} from "../common/constants";

class NotificationService {
    private channel: amqp.Channel | undefined;

    constructor() {
        this.init().catch(console.error);
    }

    sendNotification = async (userId: string, message: string) => {
        console.info(`Notification sent to user ${userId}: ${message}`);
        //todo assuming the notification is implemented
        //sendNotification();
    };

    private handleTransactionCreated(transactionData: any) {
        // Process transactionData and send notifications
        this.sendNotification(transactionData.userId,
            `You received $${transactionData.amount} from another user.`)
            .catch(console.error);
    }

    private async init() {
        const connection = await amqp.connect(RABBITMQ_URL);
        this.channel = await connection.createChannel();

        // Consume messages from the 'transactions' queue
        await this.channel.consume('transactions', (msg) => {
            if (msg) {
                const transactionData = JSON.parse(msg.content.toString());
                try {
                    this.handleTransactionCreated(transactionData);
                } catch (e: any) {
                    console.error(e.message)
                }

                if(this.channel) {
                    this.channel.ack(msg);
                }
            }
        });
    }
}
export default NotificationService;
