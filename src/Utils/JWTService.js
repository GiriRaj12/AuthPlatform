import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.TOKEN_SECRET || 'USER_APP_SECRET';
const expiry = "2h";

export default class JWTService {

    createToken(email){
        return jwt.sign({email}, SECRET, {expiresIn: expiry});
    }

    verifyToken(token){
        try {
            jwt.verify(token, SECRET);
            return true;
        } catch (error) {
            console.log(err);
            return false;
        }
    }

    refreshToken(token){
        try {
            const expiredToken = jwt.verify(token, SECRET, { ignoreExpiration: true });
            return jwt.sign({ email : expiredToken['email']}, SECRET, { expiresIn: expiry})
        } catch(err){
            console.log(err);
            return null;
        }
    }
}


