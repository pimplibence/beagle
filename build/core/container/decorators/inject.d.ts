export declare enum InjectError {
    PossibleCircularDependencyError = "InjectErrorPossibleCircularDependency"
}
export declare const inject: () => (target: object, key: string) => void;
