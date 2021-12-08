import { Container } from '../container/container';
export interface BaseApplicationRunOptions {
    env: any;
    debug?: boolean;
}
export interface Provider {
    injectable: Function;
    options?: any;
}
export declare class BaseApplication {
    static run(options?: BaseApplicationRunOptions): Promise<BaseApplication>;
    env: any;
    initialized: boolean;
    debug: boolean;
    container: Container;
    providers: Provider[];
    boot(): Promise<BaseApplication>;
    protected loadInjectables(): Promise<void>;
}
