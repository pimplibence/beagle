---
to: <%= name %>/src/application.ts
---
import { BaseApplication } from '@kifly/beagle/core/application/base-application';
import { appConfigurator } from '@kifly/beagle/core/application/decorators/app-configurator';
import { appInitializer } from '@kifly/beagle/core/application/decorators/app-initializer';

export class Application extends BaseApplication {
    @appInitializer('*')
    public async helloInit() {
        /**
         * Init loggers, error collectors!
         */

        console.log('Initialize <%= Name %> application');
    }

    @appConfigurator('*')
    public async helloWorld() {
        /**
         * Init you application!
         *
         * At this point your providers are initialized and ready to use!
         */

        console.log('Configure <%= Name %> application');
    }
}
