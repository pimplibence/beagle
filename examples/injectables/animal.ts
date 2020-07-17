import { injectable } from '../../src/container/decorators/injectable';
import { onInit } from '../../src/container/decorators/on-init';

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
