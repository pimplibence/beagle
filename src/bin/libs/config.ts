import { resolve } from 'path';
import * as process from 'process';

export enum ConfigError {
    MissingEntity = 'ConfigErrorMissingEntity'
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

    /**
     * Enable|Disable tslint
     */
    lint?: boolean;
}

export class Config {
    /**
     * Entry file
     * - it contains the Application
     * - its extension can be .(js|ts|jsx|tsx) (depends on tsconfig)
     */
    public entry: string;

    /**
     * Entry file
     * - it contains the Application
     * - its extension can be .(js|ts|jsx|tsx) (depends on tsconfig)
     */
    public environment?: string;

    /**
     * Name of application
     * - it is an informative name
     * - it will be used as third party statistics title, debugger title, etc...
     */
    public app?: string;

    /**
     * Typescript options
     */
    public typescript?: TypescriptOptions;

    public restart?: boolean;
    public restartDelay?: number;
    public reporter?: string;

    constructor(options: any) {
        this.entry = options?.entry;
        this.app = options?.app;
        this.environment = options?.environment;
        this.reporter = options?.reporter || 'default';
        this.restart = !!options?.restart;
        this.restartDelay = options?.restartDelay || 1000;

        this.typescript = {
            ...options?.typescript,
            lint: options?.typescript?.lint ?? false,
            tslint: options?.typescript?.tslint ?? './tslint.json',
            tsconfig: options?.typescript?.tsconfig ?? './tsconfig.json'
        };
    }

    public validate() {
        if (!this.entry) {
            throw new Error(ConfigError.MissingEntity);
        }
    }

    /**
     * Int this step, you have to push the developers
     */
    public warn() {
        //
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

    public hasEnvironment() {
        return !!this.environment;
    }

    public isEnvLoadable() {
        return typeof this.environment === 'string';
    }

    public getEnvironmentPath() {
        return resolve(process.cwd(), this.environment);
    }
}
