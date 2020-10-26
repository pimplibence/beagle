import { BaseApplication, Provider } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { FacebookService } from '../src/modules/facebook/facebook.service';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: FacebookService, options: { appSecret: 'c1b4fbe7cf13fa9edc94d5251c78a271' } },
    ];

    @appConfigurator('*')
    public async hello() {
        const facebook = this.container.resolve<FacebookService>(FacebookService);

        console.log(await facebook.me('EAAL2IsbxVOwBAAlakP8Ro2AIbjpJPxZBNZCzVCoY1499Hz6UZCNNw8WesT3SiP6f6PWvROrJYRiIWvCWXK50c81BX83AxlVFwrnE3oM5sSaHYPlj3QfK0phzfW6gAQZAbj7R89M4py3FJBsl63jpWp6xsYsPu4ZA20f3A6QW5YN6aJB1DzUZAgZB6f7zKqFhGhg5dZBxH4rdGZAFyC2UuZAvFg87GY82ilQsIH5N84bH0EJ8o8pav5k56od9UvAa4swAwZD'));
        /*
        const redis = this.container.resolve<RedisService>(RedisService);

        console.log(await redis.set('hello', 'kecske'));
        console.log(await redis.get('hello'));
         */
    }
}
