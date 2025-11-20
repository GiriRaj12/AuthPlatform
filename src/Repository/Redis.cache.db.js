import {createClient, RedisClientType} from 'redis'


export default class RedisHelper {

    static REDIS_CLIENT = null;
    REDIS_HOST = process.env.REDIS_HOST;
    REDIS_PORT = process.env.REDIS_PORT;

    constructor(){
        if(!(this.REDIS_HOST && this.REDIS_PORT))
            throw Error("Cannot connect to Redis host without host and port")

        if(! RedisHelper.REDIS_CLIENT){
            RedisHelper.REDIS_CLIENT = createClient({url: `redis://${this.REDIS_HOST}:${this.REDIS_PORT}`});

            if(!RedisHelper.REDIS_CLIENT.isOpen)
                RedisHelper.REDIS_CLIENT.connect();
        }


        RedisHelper.REDIS_CLIENT.on("connect", () => {console.log("Redis Connected !")});
        RedisHelper.REDIS_CLIENT.on("ready", () => {console.log("Redis Connected and Accepting Data !")});
        RedisHelper.REDIS_CLIENT.on("end", () => {console.log("Redis Disconnected !")});
        RedisHelper.REDIS_CLIENT.on("error", () => {console.log("Redis Connection Error !")});
    }

    async getValue(key){
        return await RedisHelper.REDIS_CLIENT.get(key);
    }

    async putValue(key, value){
        return await RedisHelper.REDIS_CLIENT.put(key, value);
    }

}