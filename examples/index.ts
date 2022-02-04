import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { FacebookServiceV12 } from '../src/modules/facebook/facebook-v12.service';
import { GoogleService } from '../src/modules/google/google.service';

export class Application extends BaseApplication {
    protected providers = [
        {
            injectable: FacebookServiceV12,
            options: this.config.environment.facebook
        },
        {
            injectable: GoogleService,
            options: this.config.environment.google
        }
    ];

    @appConfigurator()
    public async testFacebook() {
        const facebookService = this.container.resolve<FacebookServiceV12>(FacebookServiceV12);
        const me = await facebookService.me('---');
        console.log(me);
    }

    @appConfigurator()
    public async testGoogle() {
        const googleService = this.container.resolve<GoogleService>(GoogleService);
        const me = await googleService.me('---');
        console.log(me);
    }
}
