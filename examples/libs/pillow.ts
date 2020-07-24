import { Bed } from './bed';

export class Pillow {
    public size: number;
    public bed: Bed;

    constructor(size: number) {
        this.size = size;
    }

    public setBed(bed: Bed): void {
        this.bed = bed;
    }
}
