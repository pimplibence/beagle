import { BaseScript } from '../../src/core/application/base-script';
import { injectable } from '../../src/core/container/decorators/injectable';

@injectable()
export class TestScript extends BaseScript {
    public async run(args: any): Promise<void> {
        console.log('Test 1');

        await this.application.runScript('test2', args);
    }
}
