import express from 'express';
import UserService from '../Services/UserService.js'


const UserRouter = express.Router();

class UserController {

    constructor(){
        this.UserService = new UserService();
    }

    async loginUser(req, res) {
        const {email, password} = req.body;
        console.log(email, password);
        const response = await this.UserService.loginUser(email, password);
        return res.status(response.status).json(response)
    }

    async registerUser(req, res){
        const {email, password} = req.body;
        const response = await this.UserService.registerUser(email, password);
        return res.status(response.status).json(response)
    }

    async refreshToken(req, res){
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json(UserService.getResponseStructure(401, "Authorization token missing or invalid", true));
        }

        const response = await this.UserService.refreshToken(tokenHeader.split(" ")[1]);
        return res.status(response.status).json(response)
    }

     async checkTokenActive(req, res){
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ") || !tokenHeader.split(" ").length > 2) {
            return res.status(401).json(UserService.getResponseStructure(401, "Authorization token missing or invalid", true));
        }

        const response = await this.UserService.validateToken(tokenHeader.split(" ")[1]);
        return res.status(response.status).json(response)
    }
}


const userController = new UserController()


UserRouter.post('/login', (req, res) => userController.loginUser(req, res));
UserRouter.post('/register', (req, res) => userController.registerUser(req, res)); 
UserRouter.get('/token/refresh', (req, res) => userController.refreshToken(req, res));
UserRouter.get('/token/validate', (req, res) => userController.checkTokenActive(req, res));

export default UserRouter;