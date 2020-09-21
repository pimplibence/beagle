import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { appInitializer } from '../src/core/application/decorators/app-initializer';

export class Application extends BaseApplication {

    @appInitializer()
    protected async init0(): Promise<void> {
        console.log('Init0 - Default');
    }

    @appInitializer('*')
    protected async init1(): Promise<void> {
        console.log('Init1 - Wildcard');
    }

    @appInitializer('custom')
    protected async init2(): Promise<void> {
        console.log('Init2 - Custom Mode');
    }

    @appConfigurator()
    protected async config0(): Promise<void> {
        console.log('Config0 - Default');
    }

    @appConfigurator('*')
    protected async config1(): Promise<void> {
        console.log('Config1 - Wildcard');
    }

    @appConfigurator('custom')
    protected async config2(): Promise<void> {
        console.log('Config2 - Custom Mode');
    }
}
