import { existsSync } from 'fs';
import * as tsNode from 'ts-node';
import { Arguments } from 'yargs';
import { CompiledConfig, Config } from './libs/config';

export class Runner {
    public config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public async run(): Promise<void> {
        const config = this.config.getCompiledConfig();

        this.registerTsNode(config);

        const instance = this.registerExecutable(config);

        await instance.boot();
    }

    public async runScript(args: Arguments): Promise<void> {
        const script = args.script;

        if (!script) {
            throw new Error('MissingScript');
        }

        const config = this.config.getCompiledConfig();

        this.registerTsNode(config);

        const instance = this.registerExecutable(config);

        await instance.boot();
        await instance.runScript(script, args);

        process.exit();
    }

    /**
     * Helper Region
     */
    private registerTsNode(config: CompiledConfig) {
        const tsNodeSymbol = Symbol.for('ts-node.register.instance');

        if (!!process[tsNodeSymbol]) {
            return;
        }

        const options: tsNode.RegisterOptions = {
            pretty: true,
            logError: true
        };

        if (config?.typescript?.tsConfigPath) {
            options.project = config?.typescript?.tsConfigPath;
        }

        return tsNode.register(options);
    }

    private registerExecutable(config: CompiledConfig) {
        const entryExists = existsSync(config.entryPath);

        if (!entryExists) {
            throw new Error('MissingEntry');
        }

        const app = require(config.entryPath);

        /**
         * Preload config
         * @type {CompiledConfig}
         */
        app.Application.prototype.config = config;

        return new app.Application(config);
    }
}
