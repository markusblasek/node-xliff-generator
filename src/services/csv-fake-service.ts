import { ICsvService } from '.';
import { CreateFromCsvConfig } from '../models';

export class CsvFakeService implements ICsvService {
    public parseCsvSyncFake: (config: CreateFromCsvConfig) => string[][] = (config) => [];
    public parseCsvFake: (config: CreateFromCsvConfig) => Promise<string[][]> = (config) => Promise.resolve([]);

    public parseCsvSync(config: CreateFromCsvConfig): string[][] {
        return this.parseCsvSyncFake(config);
    }

    public parseCsv(config: CreateFromCsvConfig): Promise<string[][]> {
        return this.parseCsvFake(config);
    }
}
