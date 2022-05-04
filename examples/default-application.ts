import { Application, Provider } from '../src/core/application/application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { appTerminator } from '../src/core/application/decorators/app-terminator';
import { AService } from './service/a.service';
import { BService } from './service/b.service';
import { CService } from './service/c-service/c.service';

export class DefaultApplication extends Application {
    public providers: Provider[] = [
        { injectable: AService },
        { injectable: BService },
        { injectable: CService }
    ];

    constructor() {
        super();

        process.on('SIGTERM', async () => this.terminate(true));
        process.on('SIGINT', async () => this.terminate(true));
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
