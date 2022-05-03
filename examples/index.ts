import { sleep } from '../src/libs/sleep';
import { DefaultApplication } from './default-application';

(async () => {
    const app = await DefaultApplication.run({
        environment: 'Hello Environment'
    });

    await sleep(3000);
    await app.terminate();
})();
