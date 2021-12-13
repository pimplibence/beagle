import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { applicationRunner } from '../src/runner/application-runner';

export class Application extends BaseApplication {
    @appConfigurator()
    public async init() {
        console.log('Hello', this.environment);
    }
}

applicationRunner(Application, process.env);
