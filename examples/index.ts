import { BaseApplication, Provider } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { RedisService } from '../src/modules/cache/redis.service';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: RedisService, options: { hostname: 'localhost:6379' } }
    ];

    @appConfigurator('*')
    protected async config1(): Promise<void> {
        const redis = this.container.resolve<RedisService>(RedisService);

        await redis.set('example', 123);
        const value = await redis.get('example');

        console.log(value);
    }
}
