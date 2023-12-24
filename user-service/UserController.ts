import express from 'express';
import UserService from './UserService';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req: express.Request, res: express.Response) => {
        const { username, balance } = req.body;
        const newUser = await this.userService.createUser(username, balance);
        //todo returning data/status to client not implemented in the scope of this task
        res.json(newUser);
    };

    getUser = async (req: express.Request, res: express.Response) => {
        const userId = req.params.userId;
        const user = await this.userService.getUser(userId);
        //todo returning data/status to client not implemented in the scope of this task
        res.json(user);
    };
}

export default UserController;
