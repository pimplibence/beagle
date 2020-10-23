import { BaseApplication, Provider } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        // { injectable: RedisService, options: { hostname: 'localhost:6379' } },
        // { injectable: Connection, options: { uri: 'localhost:27017' } }
    ];

    @appConfigurator('*')
    public async hello() {
        /*
        const redis = this.container.resolve<RedisService>(RedisService);

        console.log(await redis.set('hello', 'kecske'));
        console.log(await redis.get('hello'));
         */
    }
}
