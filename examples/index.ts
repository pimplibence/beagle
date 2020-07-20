import { BaseApplication, Provider, Script } from '../src/application/base-application';
import { Bird } from './injectables/bird';
import { Cat } from './injectables/cat';
import { Dog } from './injectables/dog';
import { DebugScript } from './scripts/debug.script';

export class Application extends BaseApplication {
    protected providers: Provider[] = [
        { injectable: Dog, options: 'This is a Dog' },
        { injectable: Cat, options: 'This is a Cat' },
        { injectable: Bird, options: 'This is a Bird' },
    ];

    protected scripts: Script[] = [
        { name: 'debug', injectable: DebugScript }
    ];

    public async configure(): Promise<void> {
        console.log('This application is running normally', this.container.resolve(Cat));

        setTimeout(() => {
            throw new Error('TriggeredByUser');
        }, 3000);
    }

    public async configureHeadless(): Promise<void> {
        console.log('This application is running headless');
    }
}
