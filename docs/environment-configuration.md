# Environment Configuration

You can define environment/config variables to your application before boot them.
All of env loader scans cwd (mostly root of project) to get the target files

- configure with ***object***
- configure with ***.env*** file
- configure with ***env.json*** file (any file with name "env" that ***require(...)*** function can use as object
  source)
- configure with ***env.yaml*** file (you can also use ***env.yml***)

```typescript
import { Application } from './application';
import { loadEnvDotenv } from '../src/modules/libs/config/load-env-dotenv';
import { loadEnvJson } from '../src/modules/libs/config/load-env-json';
import { loadEnvYaml } from '../src/modules/libs/config/load-env-yaml';

// Object configuration
Application.run({ /* content of object */ });

// .env configuration
Application.run(loadEnvDotenv());

// json configuration
Application.run(loadEnvJson());

// yaml configuration
Application.run(loadEnvYaml());
```

```typescript
// Popular usecase

import { Application } from './application';

Application.run(process.env);

```
