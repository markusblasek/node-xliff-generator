import csvParse = require('csv-parse');
import csvParseSync = require('csv-parse/lib/sync');

import { ICsvService, IFileService, ILogger } from '.';
import { CsvParseError } from '../errors/csv-parse.error';
import { CreateFromCsvConfig } from '../models';

export class CsvService implements ICsvService {
    constructor(private logger: ILogger, private fileService: IFileService) { }

    public parseCsvSync(config: CreateFromCsvConfig): string[][] {
        this.logger.trace('Enter CsvService.parseCsvSync(CreateFromCsvConfig)');
        try {
            const csvFileAsString = this.fileService.readFileSync(config.csvFile).toString('utf8');
            let csvValues: string[][];
            try {
                csvValues = csvParseSync(csvFileAsString, {
                    comment: config.csvComment,
                    delimiter: config.csvDelimiter,
                    escape: config.csvEscape,
                    quote: config.csvQuote,
                    skip_empty_lines: true
                });
            } catch (e) {
                this.logger.info('An error occured parse the csv file', e);
                throw new CsvParseError(e);
            }
            const result = csvValues as string[][];
            this.checkParsedCsvFile(result);
            return result;
        } finally {
            this.logger.trace('Leave CsvService.parseCsvSync(CreateFromCsvConfig)');
        }
    }

    public parseCsv(config: CreateFromCsvConfig): Promise<string[][]> {
        return this.fileService.readFileAsPromise(config.csvFile, 'UTF-8').then((data: string | Buffer) => {
            return this.parseCsvAsPromise(config, data as string);
        });
    }

    private checkParsedCsvFile(parsedValues: string[][]): void {
        if (parsedValues.length === 0) {
            throw new CsvParseError('The csv file contains no parsed csv values. '
                + 'At least the first row with the header has to exist.');
        }
    }

    private parseCsvAsPromise(config: CreateFromCsvConfig, csvFileAsString: string): Promise<string[][]> {
        return new Promise((resolve: (value: string[][]) => void, reject: (e: any) => void) => {
            csvParse(csvFileAsString, {
                comment: config.csvComment,
                delimiter: config.csvDelimiter,
                escape: config.csvEscape,
                quote: config.csvQuote,
                skip_empty_lines: true
            }, (csvErr: any, csvData: any) => {
                if (csvErr) {
                    reject(new CsvParseError(csvErr));
                    return;
                }
                const result = csvData as string[][];
                try {
                    this.checkParsedCsvFile(result);
                } catch (e) {
                    reject(new CsvParseError((e as CsvParseError).message));
                    return;
                }
                resolve(result);
            });
        });
    }
}
