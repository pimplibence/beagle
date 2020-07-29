import { BaseScript } from '../../src/core/application/base-script';
import { injectable } from '../../src/core/container/decorators/injectable';

@injectable()
export class DebugScript extends BaseScript {
    public async run() {
        console.log('DebugScript is running');
    }
}
