import { Application, Provider } from '../src/core/application/application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { AService } from './service/a.service';
import { BService } from './service/b.service';
import { CService } from './service/c-service/c.service';

export class DefaultApplication extends Application {
    public providers: Provider[] = [
        { injectable: AService },
        { injectable: BService },
        { injectable: CService }
    ];

    @appConfigurator()
    public async init() {
        console.log('Hello World!');
    }
}
