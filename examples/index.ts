import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { MeshAdapter } from '../src/modules/codebuild/core-mesh/mesh.adapter';

export class Application extends BaseApplication {
    protected providers = [
        {
            injectable: MeshAdapter,
            options: {
                url: 'http://localhost:3043',
                endpoint: 'shit'
            }
        }
    ];

    @appConfigurator()
    public async init() {
        const mesh = this.container.resolve<MeshAdapter>(MeshAdapter);

        const response = await mesh.get('/items');

        console.log(response);
    }
}
