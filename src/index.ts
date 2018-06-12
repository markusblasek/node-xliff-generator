import { ICreateFromCsvConfig } from './models';
import {
  CsvService,
  DateTimeGeneratorService,
  FileService,
  Logger,
  MainService,
  TranslationContainerCreatorService,
  XliffGeneratorService
} from './services';

/**
 * Read in the csv file, parse it and create the xliff files.
 * @param config {ICreateFromCsvConfig} the configuration instance
 */
export function createFromCsvSync(
  config: ICreateFromCsvConfig
): void {
  mainSync(config);
  return;
}

/**
 * Read in the csv file, parse it and create the xliff files.
 * @param config {ICreateFromCsvConfig} the configuration instance
 * @return {Promise<void>} Promise with the result
 */
export function createFromCsv(
  config: ICreateFromCsvConfig
): Promise<void> {
  return main(config);
}

function createMainService(): MainService {
  const logger = new Logger();
  const dateGeneratorService = new DateTimeGeneratorService();

  const fileService = new FileService(logger);
  const translationContainerCreator = new TranslationContainerCreatorService(logger);
  const xlifGeneratorService = new XliffGeneratorService(logger, dateGeneratorService);
  const csvService = new CsvService(logger, fileService);

  const mainService = new MainService(
    logger,
    fileService,
    xlifGeneratorService,
    csvService,
    translationContainerCreator);
  return mainService;
}

function mainSync(config: ICreateFromCsvConfig): void {
  createMainService().executeSync(config);
}

function main(config: ICreateFromCsvConfig): Promise<void> {
  return createMainService().execute(config);
}

export * from './models/language-option';
