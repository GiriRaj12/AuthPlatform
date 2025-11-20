import {createClient, RedisClientType} from 'redis'


export default class RedisHelper {

    static REDIS_CLIENT = null;
    REDIS_HOST = process.env.REDIS_HOST;
    REDIS_PORT = process.env.REDIS_PORT;
    REDIS_USER_NAME = process.env.REDIS_USER_NAME;
    REDIS_PASSWORD = process.env.REDIS_PASSWORD;
    static REDIS_CONNECTED = false;

    constructor(){
        if(!(this.REDIS_HOST && this.REDIS_PORT))
            throw Error("Cannot connect to Redis host without host and port")

        if(! RedisHelper.REDIS_CLIENT){
            RedisHelper.REDIS_CLIENT = createClient({url: `redis://${this.REDIS_USER_NAME}:${this.REDIS_PASSWORD}@${this.REDIS_HOST}:${this.REDIS_PORT}`});

            if(!RedisHelper.REDIS_CLIENT.isOpen)
                RedisHelper.REDIS_CLIENT.connect();
        }


        RedisHelper.REDIS_CLIENT.on("connect", () => {
            console.log("Redis Connected !");
            RedisHelper.REDIS_CONNECTED = true;
        });

        RedisHelper.REDIS_CLIENT.on("ready", () => {console.log("Redis Connected and Accepting Data !")});
        
        RedisHelper.REDIS_CLIENT.on("end", () => {
            console.log("Redis Disconnected !");
            RedisHelper.REDIS_CONNECTED = false;
        });

        RedisHelper.REDIS_CLIENT.on("error", () => {
            console.log("Redis Connection Error !");
            RedisHelper.REDIS_CONNECTED = false;
        });
    }

    async getValue(key){
        return await RedisHelper.REDIS_CLIENT.get(key);
    }

    async putValue(key, value){
        return await RedisHelper.REDIS_CLIENT.put(key, value);
    }

}