import { Reporter } from './libs/reporter';

export class DefaultReporter extends Reporter {

    public reportError(error: any) {
        console.log(error);
    }

}
