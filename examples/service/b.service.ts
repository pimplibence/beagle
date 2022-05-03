import { inject } from '../../src/core/container/decorators/inject';
import { injectable } from '../../src/core/container/decorators/injectable';
import { onInit } from '../../src/core/container/decorators/on-init';
import { CService } from './c-service/c.service';

@injectable()
export class BService {
    @inject()
    public c: CService;

    @onInit()
    public initialize() {
        console.log('Initialize', this.constructor.name);
    }
}
