import { IFileService } from './file-service.interface';

export class FileFakeService implements IFileService {
    public fileExistsFake: (path: string, cb: (err: NodeJS.ErrnoException) => void) => void = (path, cb) => 1;

    public readFileFake: (
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException, data: string | Buffer) => void) => void
        = (path, options, cb) => 1

    public readFileSyncFake: (
        path: string,
        options?: { encoding?: null; flag?: string; } | null) => Buffer
        = (path, options) => Buffer.from('')

    public readFileAsPromiseFake: (
        path: string,
        options: {
            encoding?: string | null | undefined;
            flag?: string | undefined;
        } | string | null | undefined) => Promise<string | Buffer>
        = (path, options) => new Promise((resolve: (data: string | Buffer) => void) => {
            resolve(Buffer.from(''));
        })

    public writeFileFake: (
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException) => void) => void
        = (path, data, options, cb) => 1

    public writeFileSyncFake: (
        path: string,
        data: string | Buffer,
        options?: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | null) => void
        = (path, data, options) => 1

    public writeFileAsPromiseFake: (
        path: string,
        data: string | Buffer,
        options?: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | null) => Promise<void>
        = (path, data, options) => new Promise<void>(() => {
            return Promise.resolve();
        })

    public fileExists(path: string, cb: (err: NodeJS.ErrnoException) => void): void {
        this.fileExistsFake(path, cb);
    }

    public readFile(
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException, data: string | Buffer) => void): void {
        this.readFileFake(path, options, cb);
    }

    public readFileSync(
        path: string,
        options?: { encoding?: null; flag?: string; } | null): Buffer {
        return this.readFileSyncFake(path, options);
    }

    public readFileAsPromise(
        path: string,
        options: {
            encoding?: string | null | undefined;
            flag?: string | undefined;
        } | string | null | undefined)
        : Promise<string | Buffer> {
        return this.readFileAsPromiseFake(path, options);
    }

    public writeFile(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        },
        cb: (err: NodeJS.ErrnoException) => void): void {
        this.writeFileFake(path, data, options, cb);
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
        this.writeFileSyncFake(path, data, options);
    }

    public writeFileAsPromise(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null | undefined;
            mode?: string | number | undefined;
            flag?: string | undefined;
        } | string | null | undefined)
        : Promise<void> {
        return this.writeFileAsPromiseFake(path, data, options);
    }
}
