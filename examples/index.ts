import { BaseApplication, Script } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';
import { GoogleService } from '../src/modules/google/google.service';
import { TestScript } from './scripts/test.script';
import { Test2Script } from './scripts/test2.script';

export class Application extends BaseApplication {
    protected scripts: Script[] = [
        { name: 'test', injectable: TestScript },
        { name: 'test2', injectable: Test2Script }
    ];

    protected providers = [
        {
            injectable: GoogleService,
            options: {
                clientId: '1040087815510-f3d250d960n4iaqn9vaent4ivjvs8fk9.apps.googleusercontent.com'
            }
        }
    ];

    @appConfigurator()
    public async configure() {
        const google = this.container.resolve<GoogleService>(GoogleService);

        const respo = await google.me("eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA0MDA4NzgxNTUxMC1mM2QyNTBkOTYwbjRpYXFuOXZhZW50NGl2anZzOGZrOS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwNDAwODc4MTU1MTAtZjNkMjUwZDk2MG40aWFxbjl2YWVudDRpdmp2czhmazkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY1MTg0MzA1NzI1MjEzMzYyMjMiLCJoZCI6ImNvZGVidWlsZC5odSIsImVtYWlsIjoicGltcGxpLmJlbmNlQGNvZGVidWlsZC5odSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoic0Zud1lHdFFEbWdoam9XanZTaUlBUSIsIm5hbWUiOiJCZW5jZSBQaW1wbGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2prTlNoejRzTkVMRFRZT0E4T1Q1WWhIQ1ZIRTJmMnZGVThlaGQzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkJlbmNlIiwiZmFtaWx5X25hbWUiOiJQaW1wbGkiLCJsb2NhbGUiOiJodSIsImlhdCI6MTYxMTE4MTE1NywiZXhwIjoxNjExMTg0NzU3LCJqdGkiOiJmNWQ5NmVjODRkNTFhNGE5YzdkODJmYzhkNGYwNjk1OGM4N2RmMWRhIn0.g5ETYCWzHsZQvkV9fN8JFA9q852Lhd7MmSGIbVpuz7J-d3rv87GJ6FaEIu2wqktuVhACnixjAvCRqk54ILLpTW_45frpzK7JRxLvP8KyKL2rGbjY4HHPdYs8P6hU2sDv4oDShPPbzPVyJlvBXPSpuaXr654_Otfh3HIUfDB5a5ukY5hcGAy5tgT1lqBYDfzqf2dxOnULULTu-TYZ57-p98ZKLcobdOqduOwtiNAqauhIgMxAtFwqA2KzKXUARSbs_8gfZnnu_VcLzJZEy_9u_Fu97EvZSe7hisG-tvCl8mknazF-b9q1S0Q42LsiiaLUtYaz42WxykzHx8hVrjCSMQ");

        console.log(respo);
    }
}
