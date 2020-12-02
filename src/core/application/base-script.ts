import { Arguments } from 'yargs';
import { BaseApplication } from './base-application';
import { Progress } from './libs/progress';

export abstract class BaseScript {
    protected application: BaseApplication;
    protected progress = new Progress();

    public setApplication(app: BaseApplication) {
        this.application = app;
    }

    public async run(args: Arguments<any>): Promise<void> {
        //
    }
}
