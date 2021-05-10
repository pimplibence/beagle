import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { MeshService } from '../src/modules/mesh/mesh.service';

export class Application extends BaseApplication {
    protected providers = [
        {
            injectable: MeshService,
            options: {
                api: 'http://localhost:3043'
            }
        }
    ];

    @appConfigurator()
    public async init() {
        const mesh = this.container.resolve<MeshService>(MeshService);

        const response = await mesh.client('api').get('/catalog');

        console.log(response);
    }
}
