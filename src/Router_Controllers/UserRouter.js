import express from 'express';
import UserService from '../Services/UserService.js'


const UserRouter = express.Router();

class UserController {
    UserService = null;

    constructor(){
        this.UserService = new UserService()
    }

    loginUser(req, res) {
        const {email, password} = req.body;
        const response = this.UserService.loginUser(email, password);
        return res.status(response.status).json(response)
    }

    registerUser(req, res){
        const {email, password} = req.body;
        const response = this.UserService.registerUser(email, password);
        return res.status(response.status).json(response)
    }

    refreshToken(req, res){
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json(UserService.getResponseStructure(401, "Authorization token missing or invalid", true));
        }

        const response = UserController.UserService.registerUser(email, password);
        return res.status(response.status).json(response)
    }
}


const userController = new UserController()


UserRouter.post('/login', (req, res) => userController.loginUser(req, res));
UserRouter.post('/register', (req, res) => userController.registerUser(req, res)); 
UserRouter.get('/token/refresh', (req, res) => userController.refreshToken(req, res));

export default UserRouter;