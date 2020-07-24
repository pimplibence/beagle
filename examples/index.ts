import * as express from 'express';
import { createServer } from 'http';
import { BaseApplication, Provider } from '../src/application/base-application';
import { DogController } from './modules/express/controllers/dog.controller';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: DogController }
    ];

    protected async configure(): Promise<void> {
        const app = express();
        const server = createServer(app);

        if (this.config.libs?.sentry) {
            app.use(this.config.libs?.sentry.Handlers.requestHandler());
            app.use(this.config.libs?.sentry.Handlers.errorHandler());
        }

        app.use('/dog', this.container.resolve<DogController>(DogController).app);

        server.listen(3032);
    }
}
