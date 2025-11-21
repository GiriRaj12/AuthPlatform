import JWTService from "../Utils/JWTService.js";
import RedisDB from '../Repository/Redis.cache.db.js'



export default class UserService {
    static EMAIL_REGEX = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

    constructor(){
        this.JWTService = new JWTService();
        this.redisRepository = new RedisDB()
    }


    validateUserEmail(email){
        if(!email || typeof email !== 'string')
            throw new Error("[INVALID_EMAIL]: email cannot be null or empty")

        const emailRegex = new RegExp(/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/);
        return emailRegex.test(email);
    }

    checkEmailPasswordAndThrowErrorIfInValid(email, password){

        if(!this.validateUserEmail(email))
            throw Error("[INVALID_EMAIL]: - please provide email in the right format");

        if(!password)
            throw Error("[INVALID_PASSWORD]: password cannot be null or empty");

        const errors = [];

        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one number.");
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }

        if(errors.length > 0)
            throw Error(`[INVALID_PASSWORD]: Errors : ${errors.join(', ')}`);

        return null;
    }

    async loginUser(email, password){
        try {
            this.checkEmailPasswordAndThrowErrorIfInValid(email, password);
            await this.redisRepository.checkAndReConnect();
            const exisitingPassword = await this.redisRepository.getValue(email);

            if(!exisitingPassword)
                return this.getResponseStructure(401, "[INVALID_USER] email and password - Does not exists please register", true);

            if(password != Buffer.from(exisitingPassword, 'base64').toString('utf-8'))
                return this.getResponseStructure(401, "[INVALID_USER_PASSOWRD]: Wrong Email and Password combination ", true);

            const messageBody = { 'token' : this.JWTService.createToken(email)};
            return this.getResponseStructure(200, messageBody);
        }
        catch(err){
            return this.getResponseStructure(400, err.message, true);
        }
    }

    async registerUser(email, password){
          try {
            this.checkEmailPasswordAndThrowErrorIfInValid(email, password);
            await this.redisRepository.checkAndReConnect();

            const existingValues = await this.redisRepository.getValue(email);


            if(existingValues)
                return this.getResponseStructure(400, "[INVALID_EMAIL] email aldready exists please login", true);

            await this.redisRepository.putValue(email, Buffer.from(password, 'utf-8').toString('base64'));

            const messageBody = {"message": "[REGISTERED]: User Registered - Please login"}
            return this.getResponseStructure(200, messageBody);
        }
        catch(err){
            return this.getResponseStructure(400, err.message, true);
        }
    }

    async refreshToken(token){
        try{
            const refreshToken = this.JWTService.refreshToken(token);
            if(!refreshToken)
                return this.getResponseStructure(401, "[INVALID OR EXPIRED TOKEN]: Token Invalid Please login", true);

            return this.getResponseStructure(200, {"token": refreshToken});
        } catch(err){
            return this.getResponseStructure(400, err.message, true);
        }
    }

    async validateToken(token){
        try{
            return this.JWTService.verifyToken(token) ? this.getResponseStructure(200, {"message": "TOKEN ACTIVE"}) : this.getResponseStructure(401, "[INVALID OR EXPIRED TOKEN]", true);
        } catch(err){
            return this.getResponseStructure(400, "[INVALID_TOKEN]", true);
        }
    }

    getResponseStructure(status, message, isError=false){
        if(isError){
            return {
                'status': Number(status),
                'message': message,
            }
        } else {
            return {
                'status': Number(status), 
                'data': message
            }
        }

    }


}