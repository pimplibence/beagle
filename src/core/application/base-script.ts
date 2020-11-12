import { Arguments } from 'yargs';
import { BaseApplication } from './base-application';

export abstract class BaseScript {
    protected application: BaseApplication;

    public setApplication(app: BaseApplication) {
        this.application = app;
    }

    public async run(args: Arguments<any>): Promise<void> {
        //
    }
}
