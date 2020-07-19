import { BaseScript } from '../../src/application/libs/base-script';
import { injectable } from '../../src/container/decorators/injectable';

@injectable()
export class DebugScript extends BaseScript {
    public async run() {
        console.log('DebugScript is running');
    }
}
