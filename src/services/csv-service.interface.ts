import { CreateFromCsvConfig } from '../models';

export interface ICsvService {
    parseCsvSync(config: CreateFromCsvConfig): string[][];

    parseCsv(config: CreateFromCsvConfig): Promise<string[][]>;
}
