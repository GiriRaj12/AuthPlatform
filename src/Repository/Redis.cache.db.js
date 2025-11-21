import {createClient} from 'redis'
import dotenv from 'dotenv';
dotenv.config();

export default class RedisDB {

    static REDIS_CLIENT = null;
    REDIS_HOST = process.env.REDIS_HOST;
    REDIS_PORT = process.env.REDIS_PORT;
    REDIS_USER_NAME = process.env.REDIS_USER_NAME;
    REDIS_PASSWORD = process.env.REDIS_PASSWORD;
    REDIS_CONNECTED = false;

    constructor(){
        if(!(this.REDIS_HOST && this.REDIS_PORT))
            throw Error("Cannot connect to Redis host without host and port");

        if(!(this.REDIS_USER_NAME && this.REDIS_PASSWORD))
            throw Error("Cannot connect to redis without username and password");

        this.connect();


        RedisDB.REDIS_CLIENT.on("connect", () => {
            console.log("Redis Connected !");
            this.REDIS_CONNECTED = true;
        });

        RedisDB.REDIS_CLIENT.on("ready", () => {console.log("Redis Connected and Accepting Data !")});
        
        RedisDB.REDIS_CLIENT.on("end", () => {
            console.log("Redis Disconnected !");
            this.REDIS_CONNECTED = false;
        });

        RedisDB.REDIS_CLIENT.on("error", (err) => {
            console.log("Redis Connection Error !");
            console.log(err)
            this.REDIS_CONNECTED = false;
        });
    }


    async connect(){
         if(!RedisDB.REDIS_CLIENT){
            RedisDB.REDIS_CLIENT = createClient({url: `redis://${this.REDIS_USER_NAME}:${this.REDIS_PASSWORD}@${this.REDIS_HOST}:${this.REDIS_PORT}`});

            console.log("Connecting to Redis ! ")

            if(!RedisDB.REDIS_CLIENT.isOpen)
                RedisDB.REDIS_CLIENT.connect();
        }
    };

    async checkAndReConnect(){
        if(!this.REDIS_CONNECTED)
            await this.reConnect();
    }

    async reConnect(){
        RedisDB.REDIS_CLIENT = null;
        await this.connect();
    }

    async getValue(key){
        return await RedisDB.REDIS_CLIENT.get(key);
    }

    async putValue(key, value){
        return await RedisDB.REDIS_CLIENT.set(key, value);
    }

}