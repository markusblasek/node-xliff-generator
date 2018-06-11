export class StopWatch {
    private startMoment?: number = undefined;
    private stopMoment?: number = undefined;
    public start(): void {
        this.startMoment = Date.now();
        this.stopMoment = undefined;
    }
    public stop(): void {
        this.stopMoment = Date.now();
    }
    public getElapsedMilliseconds(): number {
        if (this.startMoment !== undefined) {
            return (this.stopMoment || Date.now()) - this.startMoment;
        }
        throw new Error('Please start the stopwatch properly');
    }
}
