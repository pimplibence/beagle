import { BaseApplication, Provider } from '../src/core/application/base-application';
import { Connection } from '../src/modules/boxer/connection';
import { RedisService } from '../src/modules/cache/redis.service';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: RedisService, options: { hostname: 'localhost:6379' } },
        { injectable: Connection, options: { uri: 'localhost:27017' } }
    ];
}
