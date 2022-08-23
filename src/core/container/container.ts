import { getCurrentConfig, InjectableConfig } from './libs/provider';

export enum ContainerError {
    IncompatibleInjectable = 'ContainerErrorIncompatibleInjectable',
    InjectableIsAlreadyExists = 'ContainerErrorInjectableIsAlreadyExists',
    InjectedInjectableIsNotRegistered = 'ContainerErrorInjectedInjectableIsNotRegistered',
    UnableToResolveUnknownInjectable = 'ContainerErrorUnableToResolveUnknownInjectable',
}

interface InjectableRecord {
    options: any;
    config: InjectableConfig;
    injectable: Function;
}

interface InjectableRecords {
    [key: string]: InjectableRecord;
}

interface InitializedRecord {
    config: InjectableConfig;
    instance: any;
}

interface InitializedRecords {
    [key: string]: InitializedRecord;
}

interface ContainerOptions {
    debug?: boolean;
    environment?: any;
}

interface ResolveOptions {
    preventUnknownInjectableError?: boolean;
    preventUninitializedError?: boolean;
}

export class Container {
    public environment: any;
    public debug: boolean = false;
    public injectables: InjectableRecords = {};
    public initialized: InitializedRecords = {};

    constructor(options?: ContainerOptions) {
        this.debug = !!options?.debug;
        this.environment = options?.environment;
    }

    public register(injectable: Function, options?: any): void {
        const config = getCurrentConfig(injectable?.prototype);

        if (!config) {
            throw new Error(ContainerError.IncompatibleInjectable);
        }

        const exists = !!this.getInjectableRecord(config);

        if (exists) {
            throw new Error(ContainerError.InjectableIsAlreadyExists);
        }

        this.addInjectableRecord(injectable, config, options);
    }

    public resolve<T>(injectable: Function, options?: ResolveOptions): T {
        const config = getCurrentConfig(injectable.prototype);

        if (!config) {
            if (options?.preventUnknownInjectableError) {
                return null;
            }

            throw new Error(ContainerError.IncompatibleInjectable);
        }

        const initialized = this.getInitializedRecord(config);

        if (!initialized) {
            if (options?.preventUninitializedError) {
                return null;
            }

            throw new Error(ContainerError.UnableToResolveUnknownInjectable);
        }

        return initialized.instance;
    }

    public async boot() {
        const records = Object
            .keys(this.injectables)
            .map((key: string) => this.injectables[key]);

        for (const record of records) {
            await this.bootInjectable(record);
        }
    }

    private async bootInjectable(record: InjectableRecord): Promise<any> {
        const initialized = this.getInitializedRecord(record.config);

        if (initialized) {
            return initialized.instance;
        }

        for (const inject of record.config.injects) {
            const injectRecord = this.getInjectableRecord(inject.config);

            if (!injectRecord) {
                throw new Error(ContainerError.InjectedInjectableIsNotRegistered);
            }

            record.injectable.prototype[inject.key] = await this.bootInjectable(injectRecord);
        }

        // @ts-ignore
        const instance = new record.injectable(record.options, this.environment);

        for (const callbackKey of record.config.onInitCallbacks) {
            await instance[callbackKey]();
        }

        for (const callbackKey of record.config.onInitAsyncCallbacks) {
            instance[callbackKey]();
        }

        this.addInitializedRecord(record.config, instance);

        return instance;
    }

    private addInjectableRecord(injectable: Function, config: InjectableConfig, options: any): void {
        this.injectables[config.identifier] = {
            injectable: injectable,
            config: config,
            options: options
        };
    }

    private getInjectableRecord(config: InjectableConfig): InjectableRecord {
        return this.injectables[config.identifier];
    }

    private addInitializedRecord(config: InjectableConfig, instance: any) {
        this.initialized[config.identifier] = {
            config: config,
            instance: instance
        };
    }

    private getInitializedRecord(config: InjectableConfig): InitializedRecord {
        return this.initialized[config.identifier];
    }
}
