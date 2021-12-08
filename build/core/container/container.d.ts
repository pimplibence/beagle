import { InjectableConfig } from './libs/provider';
export declare enum ContainerError {
    IncompatibleInjectable = "ContainerErrorIncompatibleInjectable",
    InjectableIsAlreadyExists = "ContainerErrorInjectableIsAlreadyExists",
    InjectedInjectableIsNotRegistered = "ContainerErrorInjectedInjectableIsNotRegistered",
    UnableToResolveUnknownInjectable = "ContainerErrorUnableToResolveUnknownInjectable"
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
}
export declare class Container {
    debug: boolean;
    injectables: InjectableRecords;
    initialized: InitializedRecords;
    constructor(options?: ContainerOptions);
    register(injectable: Function, options?: any): void;
    resolve<T>(injectable: Function): T;
    boot(): Promise<void>;
    private bootInjectable;
    private addInjectableRecord;
    private getInjectableRecord;
    private addInitializedRecord;
    private getInitializedRecord;
}
export {};
