import { range } from 'lodash';
import { EOL } from 'os';
import * as process from 'process';
import { interval } from 'rxjs';

export class Progress {
    public static LENGTH_OF_PROGRESS = 40;
    public static LOADED_CHAR = '█';
    public static UNLOADED_CHAR = '▒';

    public description = '';
    public percentage = 0;

    public timer = interval(200).subscribe(() => this.render());

    public render() {
        const chars = range(Progress.LENGTH_OF_PROGRESS).map((item) => {
            const cp = item / Progress.LENGTH_OF_PROGRESS;

            return cp <= this.percentage ? Progress.LOADED_CHAR : Progress.UNLOADED_CHAR;
        });

        const draw = `${chars.join('')} [${Math.round(this.percentage * 100)}%] ${this.description}`;

        process.stdout.cursorTo(0);
        process.stdout.write(draw);
    }

    public setProgress(value: number, description?: string) {
        this.percentage = value;

        if (description) {
            this.description = description;
        }
    }

    public terminate() {
        this.timer.unsubscribe();
        console.log(EOL);
    }
}
