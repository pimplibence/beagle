# Getting started

Beagle is an unopinionated framework to make NodeJs applications, based on typescript and class-decorators

# Installation

#### 1. Initialize project

- you have to initialize a NodeJs project based on typescript
- add these lines to your tsconfig

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

#### 2. Create "Hello World"

- at this step you have to create an application.ts and an index.ts as entry point of your application

```typescript
// Content of application.ts

import { BaseApplication } from '../src/core/application/base-application';
import { appConfigurator } from '../src/core/application/decorators/app-configurator';

export class Application extends BaseApplication {
    @appConfigurator()
    public async init() {
        console.log('Hello World!');
    }
}

/**
 * Where application is a BaseApplication (see bellow at Application section)
 *  and init method is a lifecycle callback (see bellow at Application Lifecycle section),
 *  that is going to be called after initialization
 */
```

```typescript
// Content of index.ts

import { Application } from './application';

Application.run();

/**
 * At this step you can run and configure your application (see bellow at Environment Configuration)
 */
```

#### 2. Run application

```bash
ts-node ./src/index.ts

# Output: Hello World!
```
