import { getCurrentConfig, InjectableConfig } from './libs/provider';

export enum ContainerError {
    InjectableIsAlreadyRegistered = 'ContainerErrorInjectableIsAlreadyRegistered',
    UnknownInjectable = 'ContainerErrorUnknownInjectable',
    UnableToGeInjectableConfig = 'ContainerErrorUnableToGetInjectableConfig',
    UninitializedInjectable = 'ContainerErrorUninitializedInjectable'
}

interface InjectableRecord {
    target: Function;
    config: InjectableConfig;
    options?: any;
}

interface InitializedRecord {
    target: Function;
    config: InjectableConfig;
    instance: any;
}

export class Container {
    public injectables: InjectableRecord[] = [];
    public initialized: InitializedRecord[] = [];

    public register(injectable: Function, options?: any): void {
        const exists = this.hasRecord(injectable);

        if (exists) {
            throw new Error(ContainerError.InjectableIsAlreadyRegistered);
        }

        this.addRecord(injectable, options);
    }

    public resolve<T>(injectable: Function): T {
        const initialized = this.getInitialized(injectable);

        if (!initialized) {
            throw new Error(ContainerError.UnknownInjectable);
        }

        return initialized.instance;
    }

    public async boot() {
        for (const item of this.injectables) {
            await this.bootInjectable(item);
        }
    }

    private async bootInjectable(injectable: InjectableRecord): Promise<any> {
        const exists = this.hasInitialized(injectable.target);

        if (exists) {
            return this.getInitialized(injectable.target).instance;
        }

        const children = injectable.config.injects;

        for (const child of children) {
            const refreshed = this.getRecord(child.target);

            injectable.target.prototype[child.key] = await this.bootInjectable(refreshed);
        }

        // @ts-ignore
        const instance = new injectable.target(injectable.options);

        for (const callbackKey of injectable.config.onInitCallbacks) {
            await instance[callbackKey]();
        }

        this.addInitialized(injectable.target, instance);

        return Promise.resolve(instance);
    }

    private extractRecord(injectable: Function): InjectableRecord {
        const config = getCurrentConfig(injectable.prototype);

        if (!config) {
            throw new Error(ContainerError.UnableToGeInjectableConfig);
        }

        return {
            target: injectable,
            config: config
        };
    }

    private getRecord(injectable: Function): InjectableRecord | undefined {
        const record = this.extractRecord(injectable);

        return this.injectables.find((i) => (i?.config?.identifier === record?.config?.identifier));
    }

    private hasRecord(injectable: Function): boolean {
        return !!this.getRecord(injectable);
    }

    private addRecord(injectable: Function, options: any): void {
        const record = this.extractRecord(injectable);

        this.injectables.push({
            ...record,
            options: options
        });
    }

    private getInitialized(injectable: Function): InitializedRecord | undefined {
        const record = this.extractRecord(injectable);

        if (!record) {
            throw new Error(ContainerError.UninitializedInjectable);
        }

        return this.initialized.find((i) => (i?.config?.identifier === record?.config?.identifier));
    }

    private hasInitialized(injectable: Function): boolean {
        return !!this.getInitialized(injectable);
    }

    private addInitialized(injectable: Function, instance: any): void {
        const record = this.extractRecord(injectable);

        this.initialized.push({
            ...record,
            instance: instance
        });
    }
}
