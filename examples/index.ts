import * as Sentry from '@sentry/node';
import * as express from 'express';
import { createServer } from 'http';
import { BaseApplication, Provider } from '../src/core/application/base-application';
import { Controller } from '../src/modules/express/injectables/controller';
import { DogController } from './modules/express/controllers/dog.controller';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: DogController }
    ];

    protected async configure(): Promise<void> {
        const app = express();
        const server = createServer(app);

        Sentry.init(this.config.environment.sentry);

        app.use('/dog', this.container.resolve<DogController>(DogController).app);

        app.use(Sentry.Handlers.errorHandler());
        app.use(Controller.handleError(false));

        server.listen(this.config.environment?.expressPort, () => console.log('Server is running on port', this.config.environment?.expressPort));
    }
}
