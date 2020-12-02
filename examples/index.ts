import { BaseApplication, Script } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { TestScript } from './scripts/test.script';
import { Test2Script } from './scripts/test2.script';

export class Application extends BaseApplication {
    protected scripts: Script[] = [
        { name: 'test', injectable: TestScript },
        { name: 'test2', injectable: Test2Script }
    ];

    @appConfigurator()
    public configure() {
        console.log('Hello');
    }
}
