import UserRepository from './UserRepository';

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (username: string, balance: number) => {
        return this.userRepository.createUser(username, balance);
    };

    getUser = async (userId: string) => {
        return this.userRepository.getUser(userId);
    };
}

export default UserService;
