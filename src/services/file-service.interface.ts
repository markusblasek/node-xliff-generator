export interface IFileService {
    fileExists(path: string, cb: (err: NodeJS.ErrnoException) => void): void;

    readFile(
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null,
        cb: (err: NodeJS.ErrnoException, data: string | Buffer) => void): void;

    readFileSync(
        path: string,
        options?: { encoding?: null; flag?: string; } | null): Buffer;

    readFileAsPromise(
        path: string,
        options: {
            encoding?: string | null;
            flag?: string;
        } | string | undefined | null): Promise<string | Buffer>;

    writeFile(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        },
        cb: (err: NodeJS.ErrnoException) => void): void;

    writeFileSync(
        path: string,
        data: string | Buffer,
        options?: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | null,
    ): void;

    writeFileAsPromise(
        path: string,
        data: string | Buffer,
        options: {
            encoding?: string | null;
            mode?: number | string;
            flag?: string;
        } | string | undefined | null): Promise<void>;
}
