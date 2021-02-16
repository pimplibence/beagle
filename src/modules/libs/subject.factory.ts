export class FactoryBuilder {
    public factories: Array<(...args: any) => Promise<any>> = [];

    public async build(...args): Promise<any> {
        const results = [];

        for (const factory of this.factories) {
            const result = await factory(...args);

            results.push(result);
        }

        return results;
    }

    public register(factory: (...args: any) => Promise<any>) {
        this.factories.push(factory);
    }
}
