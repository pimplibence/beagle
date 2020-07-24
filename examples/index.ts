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

        app.use('/dog', this.container.resolve<DogController>(DogController).app);

        server.listen(3032);
    }
}
