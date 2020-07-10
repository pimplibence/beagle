import { inject } from '../../src/container/decorators/inject';
import { injectable } from '../../src/container/decorators/injectable';
import { Animal } from './animal';
import { Dog } from './dog';

@injectable()
export class Cat extends Animal {
    @inject()
    public dog: Dog;
}
