import { BaseApplication, Provider } from '../src/core/application/base-application';
import { UserAdapter } from '../src/modules/codebuild/user-adapter/user.adapter';
import { SpecialUser } from './libs/special-user';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: UserAdapter, options: { endpoint: 'http://localhost:3034', dao: SpecialUser } }
    ];

    protected async configure(): Promise<void> {
        //
    }
}
