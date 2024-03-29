import { injectable } from '../../src/core/container/decorators/injectable';
import { onInit } from '../../src/core/container/decorators/on-init';
import { BService } from './b.service';
import { CService } from './c.service';

@injectable({
    dependencies: (options: any) => [
        { injectable: BService, options: [...options, 'b'] },
        { injectable: CService, options: [...options, 'c'] },
        { injectable: CService, options: [...options, 'c'] }
    ]
})
export class AService {
    constructor(options: any, env: any) {
        console.log(this.constructor.name, options, env);
    }

    @onInit()
    public initialize() {
        console.log('Initialize', this.constructor.name);
    }
}
