import { ILogger } from '.';

export class LoggerFake implements ILogger {
    public errorFake: (message: string, obj?: any) => void = (message, obj) => 1;
    public warnFake: (message: string, obj?: any) => void = (message, obj) => 1;
    public infoFake: (message: string, obj?: any) => void = (message, obj) => 1;
    public debugFake: (message: string, obj?: any) => void = (message, obj) => 1;
    public traceFake: (message: string, obj?: any) => void = (message, obj) => 1;

    public error(message: string, obj?: any): void {
        this.errorFake(message, obj);
    }

    public warn(message: string, obj?: any): void {
        this.warnFake(message, obj);
    }

    public info(message: string, obj?: any): void {
        this.infoFake(message, obj);
    }

    public debug(message: string, obj?: any): void {
        this.debugFake(message, obj);
    }

    public trace(message: string, obj?: any): void {
        this.traceFake(message, obj);
    }
}
