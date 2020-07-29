import { inject } from '../../src/core/container/decorators/inject';
import { injectable } from '../../src/core/container/decorators/injectable';
import { Animal } from './animal';
import { Dog } from './dog';

@injectable()
export class Cat extends Animal {
    @inject()
    public dog: Dog;
}
