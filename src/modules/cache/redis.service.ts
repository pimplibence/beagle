import * as IoRedis from 'ioredis';
import { injectable } from '../../core/container/decorators/injectable';
import { onInit } from '../../core/container/decorators/on-init';
import { CacheService } from './cache.service';

@injectable()
export class RedisService implements CacheService {
    public config: IoRedis.RedisOptions;
    public instance: IoRedis.Redis;

    constructor(config: IoRedis.RedisOptions) {
        this.config = config;
    }

    @onInit()
    public initialize() {
        this.instance = new IoRedis(this.config);
    }

    public async exists(key: string): Promise<boolean> {
        return this.get(key)
            .then((result) => !!result);
    }

    public async get(key: string): Promise<any> {
        return this.instance.get(key)
            .then((result) => result || null)
            .then((result) => this.parse(result));
    }

    public async set(key: string, value: any, ttl: number = null): Promise<any> {
        return (
            ttl
                ? this.instance.set(key, this.stringify(value), 'PX', ttl)
                : this.instance.set(key, this.stringify(value))
        )
            .then(() => (void 0));
    }

    public async remove(key: string): Promise<void> {
        return this.instance.del(key)
            .then(() => (void 0));
    }

    public async search(pattern: string): Promise<any[]> {
        return this.instance.keys(pattern)
            .then((keys) => Promise.all(
                keys.map((key) => this.get(key))
            ));
    }

    private parse(value: string): any {
        return JSON.parse(value);
    }

    private stringify(value: any): string {
        return JSON.stringify(value);
    }
}
