import { StartError } from './bin/commands/start';
import { ConfigError } from './bin/libs/config';
import { ApplicationRunnerError } from './bin/runner/application-runner';
import { ContainerError } from './core/container/container';
import { InjectError } from './core/container/decorators/inject';

export interface Errors {
    container: ContainerError;
    inject: InjectError;
    config: ConfigError;
    start: StartError;
    applicationRunner: ApplicationRunnerError;
}
