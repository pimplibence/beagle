import { BaseApplication } from '../src/core/application/base-application';
import { BadRequest } from '../src/modules/express/errors';

export class Application extends BaseApplication {
    protected async initialize(): Promise<void> {
        console.log('Initialize');
    }

    protected async configure(): Promise<void> {
        throw new BadRequest('UnableToConfigure');
    }
}
