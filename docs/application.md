# Application

As first step, you can define an application This application will manage your container and your providers in container
It has an own lifecycle, you can see in (see bellow at /docs/application-lifecycle)

When you run an application, the following steps will be running:

1. Loading environment and construction application instance
    - at this step application loads the environment and make it available in it's own prototype as ***this.env*** (
      this.env available immediately before constructing application)
2. Create a Container instance (see /docs/container)
3. Load Providers
    - at this step you can configure providers with ***this.env***
4. Initializing Itself
    - call @appInitializer() methods in application.
5. Configuring providers
    - initialize and run provider lifecycle (see /docs/container)
6. Configuring Itself
    - call @appConfigurator() methods in application.

> There is an example for a fully configured and mocked application

```typescript
import { appConfigurator } from './app-configurator';
import { appInitializer } from './app-initializer';

class Application extends BaseApplication {
    /**
     * These are the providers. (see /docs/container)
     *  this way you can register providers to the container
     */
    public providers: Provider[] = [
        /**
         * This is a popular use-case of provider registration
         *  (partialy env value added before construction of class)
         */
        { injectable: FooProvider, options: this.env.fooConfig },

        /**
         * Just a simple value added
         */
        { injectable: BarProvider, options: 'BarValue' },

        /**
         * Another simple value added
         */
        { injectable: AnotherProvider, options: Math.random() },

        /**
         *  options is not required
         */
        { injectable: WithoutConfigProvider }
    ];

    @appInitializer()
    public async barInitializer(): Promise<void> {
        /**
         * At this step you can initialize the application, for example:
         *  - add sentry, bugsnag, ..etc
         *  - init loggers, debug tools
         *
         *  What is available:
         *   - list of providers at this.providers (of course)
         *   - this.env with its value
         *
         *  What is unaailable:
         *   - container (not initialized = unusable)
         *
         *  Application lifecycle will move forward whe this function returns
         */
        console.log('This message will appear at first time');
    }
    
    @appConfigurator()
    public async fooConfigurator(): Promise<void> {
        /**
         * At this step you can configure the application, for example:
         *  - start any bussiness logic
         *  - start services
         *  - start http server
         *
         *  Application lifecycle will move forward whe this function returns
         */
        
        console.log('This message will appear at first time after container initialization');
    }

    /**
     * Of course you can define any amount of configurators and initializers
     *
     * All methods with decorator will run in order of its definition
     */
    @appInitializer()
    public async init1(): Promise<void> {
        /**/
    }

    @appInitializer()
    public async init2(): Promise<void> {
        /**/
    }

    @appConfigurator()
    public async conf1(): Promise<void> {
        /**/
    }

    @appConfigurator()
    public async conf2(): Promise<void> {
        /**/
    }

    /**
     * You can access to the container in application (see /docs/container)
     */
    @appConfigurator()
    public async accessToContainer(): Promise<void> {
        /**
         * This provider will be already initialized, because "accessToContainer" method decorated with @appInitializer()
         */
        const instanceOfFooProvider = this.container.resolve<FooProvider>(FooProvider);

        await instanceOfFooProvider.somePublicMethod();
    }
}
```
