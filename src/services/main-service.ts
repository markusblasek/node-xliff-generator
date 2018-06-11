import {
    ICsvService,
    IFileService,
    ILogger,
    TranslationContainerCreatorService,
    XliffGeneratorService
} from '.';
import { ValidationError } from '../errors';
import { CreateFromCsvConfig, ICreateFromCsvConfig, LanguageOption, TranslationContainer } from '../models';
import { LanguageKeyUtil, StopWatch } from '../utils';
import { CreateFromCsvConfigValidator } from '../validators';

export class MainService {

    constructor(
        private logger: ILogger,
        private fileService: IFileService,
        private xlifGeneratorService: XliffGeneratorService,
        private csvService: ICsvService,
        private translationContainerCreator: TranslationContainerCreatorService
    ) {
    }

    public execute(iConfig: ICreateFromCsvConfig): Promise<void> {
        this.logger.trace('Config is ', iConfig);
        let config: CreateFromCsvConfig;
        try {
            config = this.convertToCreateFromCsvConfig(iConfig);
            this.validateCreateFromCsvConfig(config);
        } catch (e) {
            return Promise.reject(new ValidationError((e as ValidationError).message));
        }
        return new Promise((resolve: () => void, reject: (e: any) => void) => {
            this.createTranslationContainerFromCsvFile(config)
                .then((data: TranslationContainer): void => {
                    this.writeXmlFiles(data, config)
                        .then(() => {
                            resolve();
                        })
                        .catch((e: any) => {
                            reject(e);
                        });
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    public executeSync(iConfig: ICreateFromCsvConfig): void {
        this.logger.trace('Enter MainService.executeSync');
        const sw = new StopWatch();
        sw.start();
        try {
            this.logger.trace('Config is ', iConfig);
            const config = this.convertToCreateFromCsvConfig(iConfig);
            this.validateCreateFromCsvConfig(config);
            const translationContainer = this.createTranslationContainerFromCsvFileSync(config);
            this.writeXmlFilesSync(translationContainer, config);
        } finally {
            sw.stop();
            this.logger.debug(`MainService.execute - Duration: ${sw.getElapsedMilliseconds()} ms`);
            this.logger.trace('Leave MainService.executeSync');
        }
    }

    private convertToCreateFromCsvConfig(iConfig: ICreateFromCsvConfig): CreateFromCsvConfig {
        const langOptions: LanguageOption[] = [];
        iConfig.languageOptions.forEach((value) => {
            const valueToAdd = new LanguageOption(value.languageKey, value.output, value.isSourceLanguage);
            langOptions.push(valueToAdd);
        });

        return new CreateFromCsvConfig(
            iConfig.projectName,
            iConfig.csvFile,
            langOptions,
            iConfig.printPretty,
            iConfig.csvDelimiter,
            iConfig.csvComment,
            iConfig.csvEscape,
            iConfig.csvQuote);
    }

    private validateCreateFromCsvConfig(config: CreateFromCsvConfig): void {
        const validator = new CreateFromCsvConfigValidator();
        validator.validate(config);
    }

    private createTranslationContainerFromCsvFileSync(config: CreateFromCsvConfig): TranslationContainer {
        const swCsvFile = new StopWatch();
        swCsvFile.start();
        const parsedCsvFile = this.csvService.parseCsvSync(config);
        this.logger.debug(`ParseCsvFileSync - Read to '${config.csvFile}': `
            + `Duration: ${swCsvFile.getElapsedMilliseconds()} ms`);

        const swCreateTranslationContainer = new StopWatch();
        swCreateTranslationContainer.start();
        const container = this.translationContainerCreator.createTranslationContainerFromParsedCsvFile(
            config, parsedCsvFile);
        this.logger.debug(`CreateTranslationContainer - `
            + `Duration: ${swCreateTranslationContainer.getElapsedMilliseconds()} ms`);

        return container;
    }

    private writeXmlFilesSync(container: TranslationContainer, config: CreateFromCsvConfig): void {
        for (const langOption of config.languageOptions) {
            const swWriteXmlFileSync = new StopWatch();
            swWriteXmlFileSync.start();
            const languageKey = LanguageKeyUtil.normalizeLanguageKey(langOption.languageKey);
            const xmlFile = this.xlifGeneratorService.generateXml(container, languageKey, config.printPretty);
            this.fileService.writeFileSync(langOption.output, xmlFile, { encoding: 'UTF-8' });
            swWriteXmlFileSync.stop();
            this.logger.debug(`WriteXmlFilesSync - Written to '${langOption.output}': `
                + `Duration: ${swWriteXmlFileSync.getElapsedMilliseconds()} ms`);
        }
    }

    private writeXmlFiles(container: TranslationContainer, config: CreateFromCsvConfig): Promise<void[]> {
        const promiseArray = [];

        for (const langOption of config.languageOptions) {
            const promise: Promise<void> = this.writeXmlFilesAsPromise(container, config, langOption);
            promiseArray.push(promise);
        }
        return Promise.all(promiseArray);
    }

    private writeXmlFilesAsPromise(
        container: TranslationContainer,
        config: CreateFromCsvConfig,
        langOption: LanguageOption): Promise<void> {
        const languageKey = LanguageKeyUtil.normalizeLanguageKey(langOption.languageKey);
        const xmlFile = this.xlifGeneratorService.generateXml(container, languageKey, config.printPretty);
        return this.fileService.writeFileAsPromise(langOption.output, xmlFile, { encoding: 'UTF-8' });
    }

    private createTranslationContainerFromCsvFile(config: CreateFromCsvConfig): Promise<TranslationContainer> {
        return this.csvService.parseCsv(config).then((parsedCsvFile: string[][]) => {
            const container = this.translationContainerCreator.createTranslationContainerFromParsedCsvFile(
                config, parsedCsvFile);
            return Promise.resolve(container);
        });
    }
}
