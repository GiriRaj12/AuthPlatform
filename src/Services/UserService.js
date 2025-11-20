import JWTService from "../Utils/JWTService.js";




export default class UserService {
    static JWTService = null;
    static EMAIL_REGEX = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

    constructor(){
        UserService.JWTService = new JWTService();
    }


    validateUserEmail(email){
        if(!email || typeof email !== 'string')
            throw new Error("[INVALID_EMAIL] email cannot be null or empty")

        const emailRegex = new RegExp(/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/);
        return emailRegex.test(email);
    }

    checkEmailPasswordAndThrowErrorIfInValid(email, password){

        if(!this.validateUserEmail(email))
            throw Error("[INVALID_EMAIL] - please provide email in the right format");

        if(!password)
            throw Error("[INVALID_PASSWORD] password cannot be null or empty")

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
            throw Error(`[INVALID_PASSWORD] Errors : ${errors.join(', ')}`);

        return true;
    }

    loginUser(email, password){
        try{
            console.log("EMail, passowrd", email, password);
            this.checkEmailPasswordAndThrowErrorIfInValid(email, password);
            const messageBody = {
                "data": "All Good"
            }
            return this.getResponseStructure(200, messageBody);
        }
        catch(err){
            return this.getResponseStructure(401, err.message, true);
        }
    }

    registerUser(email, password){
          try{
            this.checkEmailPasswordAndThrowErrorIfInValid(email, password);
            const messageBody = {
                "data": "All Good"
            }
            return this.getResponseStructure(200, messageBody);
        }
        catch(err){
            return this.getResponseStructure(401, err.message, true);
        }
    }

    getResponseStructure(status, message, isError=false){
        if(isError){
            return {
                'status': status,
                'message': message,
            }
        } else {
            return {
                'status': status, 
                'data': message
            }
        }

    }


}