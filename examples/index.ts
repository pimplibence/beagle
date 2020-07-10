import { BaseApplication, Provider } from '../src/application/base-application';
import { Bird } from './injectables/bird';
import { Cat } from './injectables/cat';
import { Dog } from './injectables/dog';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: Dog },
        { injectable: Cat },
        { injectable: Bird },
    ];
}
