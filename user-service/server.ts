import express from 'express';
import UserController from './UserController';
require('dotenv').config();

const app = express();
//todo should be in a .env file
const port = 3000;

app.use(express.json());

const userController = new UserController();

app.post('/users', userController.createUser);
app.get('/users/:userId', userController.getUser);

app.listen(port, () => {
    console.info(`User Service listening at http://localhost:${port}`);
});
