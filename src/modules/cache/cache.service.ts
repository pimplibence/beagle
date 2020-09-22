export interface CacheService {
    exists(key: string): Promise<boolean>;

    get(key: string): Promise<any>;

    set(key: string, value: any, ttl: number): Promise<void>;

    remove(key: string): Promise<void>;

    search(pattern: string): Promise<any[]>;
}
