import { resolve } from 'path';
import * as process from 'process';

export enum ConfigError {
    MissingEntity = 'ConfigErrorMissingEntity',
    MissingMode = 'ConfigErrorMissingMode',
}

interface TypescriptOptions {
    /**
     * Specify custom path of tsconfig.json
     */
    tsconfig?: string;

    /**
     * Specify custom path of tslint.json
     * - it will be only used if tslint is enabled
     */
    tslint?: string;
}

export interface CompiledConfig {
    mode?: string;
    app?: string;
    restart?: boolean;
    restartDelay?: number;
    entryPath?: string;
    environment?: any;
    skipTsNode?: boolean;
    typescript?: {
        tsLintPath?: string;
        tsConfigPath?: string;
    };
}

export class Config {
    public entry: string;
    public environment?: string;
    public app?: string;
    public mode?: string;
    public skipTsNode?: boolean;
    public typescript?: TypescriptOptions;
    public restart?: boolean;
    public restartDelay?: number;

    constructor(options: any = null, cliArgs: any = null) {
        this.entry = cliArgs?.entry ?? options?.entry;
        this.app = cliArgs?.app ?? options?.app;
        this.mode = cliArgs?.mode ?? options?.mode ?? 'default';
        this.skipTsNode = cliArgs?.skipTsNode ?? options?.skipTsNode ?? false;
        this.environment = cliArgs?.environment ?? options?.environment;
        this.restart = cliArgs?.restart ?? !!options?.restart;
        this.restartDelay = cliArgs?.restartDelay ?? options?.restartDelay ?? 1000;

        this.typescript = {
            ...options?.typescript,
            lint: cliArgs?.typescript?.lint ?? options?.typescript?.lint ?? false,
            tslint: cliArgs?.typescript?.tslint ?? options?.typescript?.tslint ?? './tslint.json',
            tsconfig: cliArgs?.typescript?.tsconfig ?? options?.typescript?.tsconfig ?? './tsconfig.json'
        };
    }

    public validate() {
        if (!this.entry) {
            throw new Error(ConfigError.MissingEntity);
        }

        if (!this.mode) {
            throw new Error(ConfigError.MissingMode);
        }
    }

    public getTsConfigPath() {
        return resolve(process.cwd(), this.typescript.tsconfig);
    }

    public getTsLintPath() {
        return resolve(process.cwd(), this.typescript.tsconfig);
    }

    public getEntryPath() {
        return resolve(process.cwd(), this.entry);
    }

    public getEnvironmentPath() {
        if (!this.environment) {
            return null;
        }

        return resolve(process.cwd(), this.environment);
    }

    public getCompiledConfig(): CompiledConfig {
        return {
            app: this.app,
            mode: this.mode,
            restart: this.restart,
            restartDelay: this.restartDelay,
            skipTsNode: this.skipTsNode,
            entryPath: this.getEntryPath(),
            environment: require(this.getEnvironmentPath()),
            typescript: {
                tsLintPath: this.getTsLintPath(),
                tsConfigPath: this.getTsConfigPath()
            }
        };
    }
}
