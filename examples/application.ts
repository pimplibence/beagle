import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';

export class Application extends BaseApplication {
    @appConfigurator()
    public async init() {
        console.log('Hello', this.env);
    }
}
