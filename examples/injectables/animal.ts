import { injectable } from '../../src/container/decorators/injectable';
import { onInit } from '../../src/container/decorators/on-init';

@injectable()
export class Animal {
    public random = Math.random();

    @onInit()
    public async initialize() {
        return Promise.resolve();
    }
}
