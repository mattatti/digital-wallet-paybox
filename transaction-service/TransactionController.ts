import express from 'express';
import TransactionService from './TransactionService';

class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    createTransaction = async (req: express.Request, res: express.Response) => {
        const { senderId, receiverId, amount } = req.body;
        const newTransaction = await this.transactionService.createTransaction(
            senderId,
            receiverId,
            amount
        );
        //todo returning data/status to client not implemented in the scope of this task
        res.json(newTransaction);
    };

    getTransaction = async (req: express.Request, res: express.Response) => {
        const transactionId = req.params.transactionId;
        const transaction = await this.transactionService.getTransaction(transactionId);
        //todo returning data/status to client not implemented in the scope of this task
        res.json(transaction);
    };
}

export default TransactionController;
