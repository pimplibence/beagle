import * as express from 'express';
import { createServer } from 'http';
import { BaseApplication, Provider } from '../src/application/base-application';
import { Controller } from '../src/modules/express/injectables/controller';
import { DogController } from './modules/express/controllers/dog.controller';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: DogController }
    ];

    protected async configure(): Promise<void> {
        const app = express();
        const server = createServer(app);

        app.use(this.config.libs?.sentry?.Handlers.requestHandler());

        app.use('/dog', this.container.resolve<DogController>(DogController).app);

        app.use(Controller.handleError(true));
        app.use((e, req, res, next) => this.config.libs?.sentry?.captureException(e));

        server.listen(this.config.environment?.expressPort, () => console.log('Server is running on port', this.config.environment?.expressPort));
    }
}
