import { NodeOptions as SentryOptions } from '@sentry/node';
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
}

export interface CompiledConfig {
    app?: string;
    restart?: boolean;
    restartDelay?: number;
    entryPath?: string;
    environmentPath?: string;
    typescript?: {
        tsLintPath?: string;
        tsConfigPath?: string;
    };
    sentry?: any;
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

    public typescript?: TypescriptOptions;
    public sentry?: SentryOptions;

    public restart?: boolean;
    public restartDelay?: number;

    constructor(options: any) {
        this.entry = options?.entry;
        this.app = options?.app;
        this.environment = options?.environment;
        this.restart = !!options?.restart;
        this.restartDelay = options?.restartDelay || 1000;

        this.typescript = {
            ...options?.typescript,
            lint: options?.typescript?.lint ?? false,
            tslint: options?.typescript?.tslint ?? './tslint.json',
            tsconfig: options?.typescript?.tsconfig ?? './tsconfig.json'
        };

        this.sentry = {
            ...options?.sentry
        };
    }

    public validate() {
        if (!this.entry) {
            throw new Error(ConfigError.MissingEntity);
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
            restart: this.restart,
            restartDelay: this.restartDelay,
            entryPath: this.getEntryPath(),
            environmentPath: this.getEnvironmentPath(),
            typescript: {
                tsLintPath: this.getTsLintPath(),
                tsConfigPath: this.getTsConfigPath()
            },
            sentry: this.sentry
        };
    }
}
