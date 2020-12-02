import * as ProgressBar from 'progress';

export class Progress {
    private progress: ProgressBar;
    private total = 0;
    private format = '[:bar] (percentage: :percent, c/t: :current/:total, rate: :rate/s, eta: :etas, elapsed: :elapseds)';

    public setTotal(value: number) {
        this.total = value;
    }

    public setFormat(value: string) {
        this.format = value;
    }

    public start() {
        this.progress = new ProgressBar(this.format, {
            total: this.total,
            width: 30,
            complete: '█',
            incomplete: '░'
        });
    }

    public advance() {
        if (!this.progress) {
            return;
        }

        if (this.progress.complete) {
            return;
        }

        this.progress.tick();

        if (this.progress.complete) {
            this.complete();
        }
    }

    public interrupt(message: string) {
        if (!this.progress) {
            return;
        }

        this.progress.interrupt(message);
    }

    public complete() {
        if (!this.progress) {
            return;
        }

        this.progress.terminate();
    }
}
