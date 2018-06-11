export interface ILogger {
    error(message: string, obj?: any): void;
    warn(message: string, obj?: any): void;
    info(message: string, obj?: any): void;
    debug(message: string, obj?: any): void;
    trace(message: string, obj?: any): void;
}
