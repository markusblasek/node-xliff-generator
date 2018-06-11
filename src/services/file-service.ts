import fs = require('fs');
import mkdirp = require('mkdirp');
import pathLib = require('path');
import { ILogger } from '.';
import { IOError } from '../errors/io.error';
import { IFileService } from './file-service.interface';

export class FileService implements IFileService {
    public constructor(private logger: ILogger) { }

    public fileExists(path: string, cb: (err: NodeJS.ErrnoException) => void): void {
        fs.access(path, fs.constants.R_OK, cb);
    }

    public readFile(
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException, data: string | Buffer) => void): void {
        fs.readFile(path, options, cb);
    }

    public readFileAsPromise(
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null): Promise<string | Buffer> {
        return new Promise((resolve: (csvData: string | Buffer) => void, reject: (e: any) => void) => {
            this.readFile(path, options,
                (fsErr: NodeJS.ErrnoException, fileContent: string | Buffer): void => {
                    if (fsErr) {
                        reject(new IOError(fsErr.message));
                        return;
                    }
                    resolve(fileContent);
                });
        });
    }

    public readFileSync(
        path: string,
        options?: { encoding?: null; flag?: string; } | null): Buffer {
        try {
            this.logger.trace('Enter FileService.readFileSync');
            return fs.readFileSync(path, options);
        } catch (e) {
            this.logger.info('An error occured while reading from file system', e);
            throw new IOError(e);
        } finally {
            this.logger.trace('Leave FileService.readFileSync');
        }
    }

    public writeFile(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException) => void): void {
        mkdirp(pathLib.dirname(path), (err: any): void => {
            if (err) {
                return cb(err);
            }

            fs.writeFile(path, data, options, cb);
        });
    }

    public writeFileAsPromise(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | undefined | null): Promise<void> {
        try {
            mkdirp.sync(pathLib.dirname(path));
        } catch (e) {
            throw new IOError(e);
        }
        return new Promise(((resolve: () => void, reject: (e: any) => void) => {
            this.writeFile(path, data, options,
                (fsErr: NodeJS.ErrnoException): void => {
                    if (fsErr) {
                        reject(new IOError(fsErr.message));
                        return;
                    }
                    resolve();
                });
        }));
    }

    public writeFileSync(
        path: string,
        data: string | Buffer,
        options?: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | null,
    ): void {
        try {
            this.logger.trace('Enter FileService.writeFileSync');
            mkdirp.sync(pathLib.dirname(path));
            fs.writeFileSync(path, data, options);
        } catch (e) {
            this.logger.info('An error occured while writing to file system', e);
            throw new IOError(e);
        } finally {
            this.logger.trace('Leave FileService.writeFileSync');
        }
    }
}
