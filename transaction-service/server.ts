import express from 'express';
import TransactionController from './TransactionController';

const app = express();
//todo should be in a .env file
const port = 4000;

app.use(express.json());

const transactionController = new TransactionController();

app.post('/transactions', transactionController.createTransaction);
app.get('/transactions/:transactionId', transactionController.getTransaction);

app.listen(port, () => {
    console.info(`Transaction Service listening at http://localhost:${port}`);
});
