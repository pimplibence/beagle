import { Pillow } from './pillow';

export class Bed {
    public pillows: Pillow[] = [];

    public addPillow(pillow: Pillow): void {
        pillow.setBed(this);

        this.pillows.push(pillow);
    }
}
