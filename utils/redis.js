import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * redis client.
 */

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.log('Redis Client Error:', err));
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            });
        });
    }
}

export const redisClient = new RedisClient();
export default redisClient;
