# Application

### What can i use for?

The application class is the entry point of the program. It manages the application and provider lifecycle, boots and
terminates the application. With application instance, you can start and configure your application, provide environment
variables, and terminate after it finishes its job

### How can i use it?

To define an application, create a class on any name and extend it from Application

```typescript
// my-application.ts

import { Application } from './application';

export class MyApplication extends Application {
    //
}

// index.ts
const instance = await MyApplication.run();
```

After calling "run" method, you application starts running. To define "MyApplication" behaviour, you can create
lifecycle methods and register providers in it.

### Define lifecycle methods

#### appInitializer

You can define any methods in "MyApplication" with "appInitializer" decorator. These methods will be called BEFORE the
IoC container initialization. (Practically this means, you cannot access to container in this step)

```typescript
import { appInitializer } from './app-initializer';
import { Application } from './application';

export class MyApplication extends Application {
    @appInitializer()
    public async initializeSentry() {
        // At this step you can initialize a sentry instance to catch and analyze errors
    }

    @appInitializer()
    public async initializeLogger() {
        // Initialize a logger
    }
}
```

#### appConfigurator

You can define any methods in "MyApplication" with "appConfigurator" decorator. These methods will be called AFTER the
IoC container initialization.

```typescript
import { appConfigurator } from './app-initializer';
import { Application } from './application';

export class MyApplication extends Application {
    @appConfigurator()
    public async startHttpServer() {
        // Create a http server and use some providers as http controller from container
    }

    @appConfigurator()
    public async healthz() {
        // At this point, you application is ready to receive http requests
    }
}
```

#### appTerminator

You can define any methods in "MyApplication" with "appConfigurator" decorator. These methods will be called only after
you call Application.terminate methods manually. It cannot detect termination automatically, so you have to implement
the interruption or termination manually

```typescript
import { appConfigurator } from './app-initializer';
import { Application } from './application';

export class MyApplication extends Application {
    constructor() {
        super();

        // At these lines you can detect termination and interruption
        process.on('SIGTERM', async (signal) => this.terminate({ signal }));
        process.on('SIGINT', async (signal) => this.terminate({ signal }));
    }

    @appTerminator()
    public async disconnectDatabase(options: TerminateOptions) {
        // At this method you can disconnect database gracefully
    }

    @appTerminator()
    public async stopHttpServer(options: TerminateOptions) {
        // At this method you can stop webserver gracefully
    }

    @appTerminator()
    public async persistUnpersistedDataToDiskOrAnywhere(options: TerminateOptions) {
        // At this method you can save unpersisted data
    }
}
```

### Accessing Container

Application provides a Container instance as a public property. You can access container in any of lifecycle callback,
but in appInitializer, container will be uninitialized

```typescript
import { appInitializer } from './app-initializer';
import { Application } from './application';

export class MyApplication extends Application {
    public providers = [
        { injectable: AService }
    ]

    @appInitializer()
    public async init() {
        const a1 = this.container.resolve<AService>(AService);
        // a1: Throws an error!!! UninitializedMember

        const a2 = this.container.resolve<AService>(AService, {
            preventUninitializedError: true
        });
        // a2: Does not throw error, but will be null
    }

    @appInitializer()
    public async conf() {
        const a = this.container.resolve<AService>(AService);
        // a: is instance of AService
    }

    @appInitializer()
    public async term() {
        const a = this.container.resolve<AService>(AService);
        // a: is instance of AService
    }
}
```

