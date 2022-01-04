"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (durationMilliseconds) => new Promise((resolve) => {
    setTimeout(() => resolve(), durationMilliseconds);
});
exports.sleep = sleep;
