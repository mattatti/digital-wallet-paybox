import express from 'express';
import NotificationService from './NotificationService';

class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    sendNotification = async (req: express.Request, res: express.Response) => {
        const { userId, message } = req.body;
        const newNotification = await this.notificationService.sendNotification(userId, message);
        //todo returning data/status to client not implemented in the scope of this task
        res.json(newNotification);
    };

}

export default NotificationController;
