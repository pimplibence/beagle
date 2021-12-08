import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { sleep } from '../src/modules/libs/sleep';
import { applicationRunner } from '../src/runner/application-runner';

export class Application extends BaseApplication {
    @appConfigurator()
    public async init() {
        console.log('Hello Bello');
    }

    @appConfigurator()
    public async init1() {
        await sleep(1000);
        console.log('Hello Bello');
    }

    @appConfigurator()
    public async init2() {
        await sleep(1000);
        console.log('Hello Bello');
    }
}

applicationRunner(Application, process.env);
