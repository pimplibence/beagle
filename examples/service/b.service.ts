import { injectable } from '../../src/core/container/decorators/injectable';
import { onInit } from '../../src/core/container/decorators/on-init';

@injectable()
export class BService {
    constructor(options: any, env: any) {
        console.log(this.constructor.name, options, env);
    }

    @onInit()
    public initialize() {
        console.log('Initialize', this.constructor.name);
    }
}
