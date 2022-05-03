import { injectable } from '../../src/core/container/decorators/injectable';
import { onInit } from '../../src/core/container/decorators/on-init';

@injectable()
export class AService {
    @onInit()
    public initialize() {
        console.log('Initialize', this.constructor.name);
    }
}
