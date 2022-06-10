import { Command } from './libs/command';
import { defaultExecutable } from './libs/default-executable';

export interface HelmOptions {
    executable?: string;
}

export interface ListOptions {
    all?: boolean;
    allNamespaces?: boolean;
    data?: boolean;
    deployed?: boolean;
    failed?: boolean;
    filter?: string;
    max?: number;
    offset?: number;
    pending?: boolean;
    reverse?: boolean;
    selector?: string;
    superseded?: boolean;
    timeFormat?: string;
    uninstalled?: boolean;
    uninstalling?: boolean;
}

export class Helm {
    public command: Command;
    public options: HelmOptions;

    constructor(options?: HelmOptions) {
        this.options = options;

        this.command = new Command({
            executable: options.executable || defaultExecutable()
        });
    }

    public async create(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async dependency(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async env(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async get(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async history(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async install(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async list(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async package(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async plugin(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async pull(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async push(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async registry(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async repo(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async rollback(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async search(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async status(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async template(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async test(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async uninstall(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async upgrade(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async verify(options: any) {
        throw Error('UnimplementedFeature');
    }

    public async version(options: any) {
        throw Error('UnimplementedFeature');
    }
}
