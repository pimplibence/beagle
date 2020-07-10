import { Container } from '../container';

export const mergeContainers = (a: Container, b: Container): Container => {
    if (a.isBooted()) {
        throw new Error('UnableToMergeBootedContainers');
    }

    if (b.isBooted()) {
        throw new Error('UnableToMergeBootedContainers');
    }

    const injectables = [
        ...a.injectables,
        ...b.injectables
    ];

    const container = new Container();

    for (const injectable of injectables) {
        container.register(injectable.target, injectable.options);
    }

    return container;
};
