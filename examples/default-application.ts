import { Application, Provider } from '../src/core/application/application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { Helm } from '../src/libs/helm/helm';

export class DefaultApplication extends Application {
    public providers: Provider[] = [];

    constructor() {
        super();

        process.on('SIGTERM', async (signal) => this.terminate({ signal }));
        process.on('SIGINT', async (signal) => this.terminate({ signal }));
    }

    @appConfigurator()
    public async init() {
        const helm = new Helm();
    }
}
