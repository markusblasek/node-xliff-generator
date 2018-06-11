import bunyan = require('bunyan');

import { ILogger } from '.';

export class Logger implements ILogger {
    private readonly isLogMessagesActivated: boolean;
    private logger: bunyan;
    public constructor() {
        const envVariableLogLevel = process.env.LOG_LEVEL;
        this.isLogMessagesActivated = envVariableLogLevel !== undefined;
        this.logger = bunyan.createLogger({
            name: 'XliffGenerator',
            streams: [
                {
                    level: this.detectLogLevel(envVariableLogLevel),
                    stream: process.stdout
                }
            ]
        });
    }

    public error(message: string, obj?: any): void {
        if (this.isLogMessagesActivated) {
            if (obj) {
                this.logger.error(message, obj);
            } else {
                this.logger.error(message);
            }
        }
    }

    public warn(message: string, obj?: any): void {
        if (this.isLogMessagesActivated) {
            if (obj) {
                this.logger.warn(message, obj);
            } else {
                this.logger.warn(message);
            }
        }
    }

    public info(message: string, obj?: any): void {
        if (this.isLogMessagesActivated) {
            if (obj) {
                this.logger.info(message, obj);
            } else {
                this.logger.info(message);
            }
        }
    }

    public debug(message: string, obj?: any): void {
        if (this.isLogMessagesActivated) {
            if (obj) {
                this.logger.debug(message, obj);
            } else {
                this.logger.debug(message);
            }
        }
    }

    public trace(message: string, obj?: any): void {
        if (this.isLogMessagesActivated) {
            if (obj) {
                this.logger.trace(message, obj);
            } else {
                this.logger.trace(message);
            }
        }
    }

    private detectLogLevel(envLogLevel?: string): bunyan.LogLevel {
        let envLogLevelLoc = envLogLevel || 'fatal';
        envLogLevelLoc = envLogLevelLoc.toLowerCase();
        switch (envLogLevel) {
            case 'trace':
                return 'trace';
            case 'debug':
                return 'debug';
            case 'info':
                return 'info';
            case 'warn':
                return 'warn';
            case 'error':
                return 'error';
            case 'fatal':
            default:
                return 'fatal';
        }
    }
}
