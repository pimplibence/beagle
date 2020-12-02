import { BaseScript } from '../../src/core/application/base-script';
import { injectable } from '../../src/core/container/decorators/injectable';

@injectable()
export class Test2Script extends BaseScript {
    public async run(args: any): Promise<void> {
        this.progress.setTotal(1000000000);
        this.progress.start();

        while (true) {
            this.progress.advance();
        }
    }
}
