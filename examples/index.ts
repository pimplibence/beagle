import { ObjectId } from 'bson';
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

        const parser = new RequestParser({ query: { hello: '5f5280286850ef188dfebe32' } } as any, {
            enabledQueryKeys: ['hello', 'bello'],
            transformer: new MongoTransformer([
                (query) => query.hello ? { helloValue: new ObjectId(query.hello) } : null,
                (query) => query.bello ? { belloValue: query.bello } : null,
            ])
        });

        console.log(parser.transform('andQuery'));
    }
}
