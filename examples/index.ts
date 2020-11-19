import { BaseApplication, Provider } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { FacebookService } from '../src/modules/facebook/facebook.service';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: FacebookService, options: { appSecret: 'c1b4fbe7cf13fa9edc94d5251c78a271' } }
    ];

    @appConfigurator('*')
    public async hello() {
        const facebook = this.container.resolve<FacebookService>(FacebookService);
    }
}
