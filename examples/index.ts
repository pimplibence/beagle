import { BaseApplication, Provider, Script } from '../src/application/base-application';
import { Bird } from './injectables/bird';
import { Cat } from './injectables/cat';
import { Dog } from './injectables/dog';
import { DebugScript } from './scripts/debug.script';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: Dog },
        { injectable: Cat },
        { injectable: Bird },
    ];

    protected scripts: Script[] = [
        { name: 'debug', injectable: DebugScript }
    ];

    public async configure(): Promise<void> {
        console.log('This application is running normally');
    }

    public async configureHeadless(): Promise<void> {
        console.log('This application is running headless');
    }
}
