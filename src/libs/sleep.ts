export const sleep = (durationMilliseconds: number) => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), durationMilliseconds);
});
