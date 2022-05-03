import { inject } from '../../../src/core/container/decorators/inject';
import { injectable } from '../../../src/core/container/decorators/injectable';
import { onInit } from '../../../src/core/container/decorators/on-init';
import { AService } from '../a.service';

@injectable()
export class CService {
    @inject()
    public a: AService;

    @onInit()
    public initialize() {
        console.log('Initialize', this.constructor.name);
    }
}
