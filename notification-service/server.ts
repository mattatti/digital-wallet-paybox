import express from 'express';
import NotificationController from './NotificationController';

const app = express();
//todo should be in a .env file
const port = 5000;

app.use(express.json());

const notificationController = new NotificationController();

app.post('/notifications', notificationController.sendNotification);
app.get('/notifications/:userId', notificationController.getNotifications);

app.listen(port, () => {
    console.info(`Notification Service listening at http://localhost:${port}`);
});
