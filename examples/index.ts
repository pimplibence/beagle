import * as express from 'express';
import { createServer } from 'http';
import { BaseApplication, Provider } from '../src/core/application/base-application';
import { UserAdapter } from '../src/modules/codebuild/user-adapter/user.adapter';
import { MongoTransformer } from '../src/modules/express/libs/request-transformers/mongo.transformer';
import { RequestParser } from '../src/modules/express/libs/request.parser';
import { SpecialUser } from './libs/special-user';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: UserAdapter, options: { endpoint: 'http://localhost:3034', dao: SpecialUser } }
    ];

    protected async configure(): Promise<void> {
        const app = express();
        const server = createServer(app);

        app.use((req, res) => {

            const parser = new RequestParser(req, {
                enabledQueryKeys: ['hello', 'bello'],
                transformer: new MongoTransformer([
                    (query) => query.hello ? { helloValue: query.hello } : null,
                    (query) => query.bello ? { belloValue: query.bello } : null,
                ])
            });

            res.send(parser.transform('options'));
        });

        server.listen(3033);
    }
}
