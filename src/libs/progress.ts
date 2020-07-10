import { range } from 'lodash';

export class Progress {
    public static CLEAR_LINES = true;
    public static LENGTH_OF_PROGRESS = 40;
    public static LOADED_CHAR = '█';
    public static UNLOADED_CHAR = '▒';

    public description = '';
    public percentage = 0;
    public title: string;

    constructor(title?: string) {
        this.title = title;

        this.render();
    }

    public render() {
        const chars = range(Progress.LENGTH_OF_PROGRESS).map((item) => {
            const cp = item / Progress.LENGTH_OF_PROGRESS;

            return cp <= this.percentage ? Progress.LOADED_CHAR : Progress.UNLOADED_CHAR;
        });

        const draw = `${chars.join('')} [${Math.round(this.percentage * 100)}%] ${this.description}`;

        if (Progress.CLEAR_LINES) {
            /**
             * ATTENTION
             * This console.log is part of this project
             * If you want to delete, please do not
             * Yes, i know, all console.clear must die, but this one is useful, trust mes
             */
            // tslint:disable-next-line
            console.clear();
        }

        if (this.title) {
            /**
             * ATTENTION
             * This console.log is part of this project
             * If you want to delete, please do not
             * Yes, i know, all console.clear must die, but this one is useful, trust mes
             */
            // tslint:disable-next-line
            console.log(this.title);
        }

        /**
         * ATTENTION
         * This console.log is part of this project
         * If you want to delete, please do not
         * Yes, i know, all console.clear must die, but this one is useful, trust mes
         */
        // tslint:disable-next-line
        console.log(draw);
    }

    public setProgress(value: number, description?: string) {
        this.percentage = value;

        if (description) {
            this.description = description;
        }

        this.render();
    }

    public addProgress(amount: number, description?: string) {
        const percentage = this.percentage + amount;

        this.setProgress(percentage, description);
    }

    public interpolate(percentage: number, to: number, description?: string) {
        const difference = to - this.percentage;
        const amount = difference * percentage;

        this.addProgress(amount, description);
    }
}
