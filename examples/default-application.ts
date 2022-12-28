import { Application, Provider } from '../src/core/application/application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { appTerminator } from '../src/core/application/decorators/app-terminator';
import { AService } from './service/a.service';

export class DefaultApplication extends Application {
    public providers: Provider[] = [
        { injectable: AService, options: ['a'] }
    ];

    constructor() {
        super();

        process.on('SIGTERM', async (signal) => this.terminate({ signal }));
        process.on('SIGINT', async (signal) => this.terminate({ signal }));
    }

    @appConfigurator()
    public async init() {
        console.log('Hello World!');
    }

    @appTerminator()
    public async beforeKill() {
        console.log('Good Bye!');
    }
}
