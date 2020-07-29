import { injectable } from '../../src/core/container/decorators/injectable';
import { onInit } from '../../src/core/container/decorators/on-init';

@injectable()
export class Animal {
    public random = Math.random();

    constructor(protected options: any) {
    }

    @onInit()
    public async initialize() {
        console.log('Animal says -> ', this.options);
    }
}
