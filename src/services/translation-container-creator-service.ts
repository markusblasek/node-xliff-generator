import { ILogger } from '.';
import { CreateFromCsvConfig, TranslationContainer } from '../models';

export class TranslationContainerCreatorService {
    public constructor(private logger: ILogger) { }

    public createTranslationContainerFromParsedCsvFile(
        config: CreateFromCsvConfig,
        parsedCsvFile: string[][]): TranslationContainer {
        try {
            this.logger.trace('Enter TranslationContainerCreatorService.createTranslationContainerFromParsedCsvFile');
            let sourceLanguageKey: string = '';
            const supportedLanguageKeys: string[] = [];
            for (const option of config.languageOptions) {
                if (option.isSourceLanguage) {
                    sourceLanguageKey = option.languageKey;
                }
                supportedLanguageKeys.push(option.languageKey);
            }

            const result = new TranslationContainer(config.projectName, sourceLanguageKey, supportedLanguageKeys);
            this.fillTranslationContainerFromParsedCsvFile(result, parsedCsvFile);
            return result;
        } finally {
            this.logger.trace('Leave TranslationContainerCreatorService.createTranslationContainerFromParsedCsvFile');
        }
    }

    private fillTranslationContainerFromParsedCsvFile(
        container: TranslationContainer,
        parsedValues: string[][]): void {
        // The first entry in each row of the csv file has to be the translation id
        const translationIdIndex = 0;

        const headersRow = parsedValues[0];

        for (let sourceLanguageIndex = translationIdIndex + 1, headerValueLen = headersRow.length;
            sourceLanguageIndex < headerValueLen; ++sourceLanguageIndex) {
            const sourceLanguageKey = headersRow[sourceLanguageIndex];

            if (!container.isLanguageKeySupported(sourceLanguageKey)) {
                continue;
            }

            for (let csvRowIndex = 1, csvRowsLen = parsedValues.length;
                csvRowIndex < csvRowsLen; ++csvRowIndex) {
                const csvRowValues = parsedValues[csvRowIndex];
                const translationId = csvRowValues[translationIdIndex];
                const translationValue = csvRowValues[sourceLanguageIndex];

                container.addTranslation(
                    translationId,
                    sourceLanguageKey,
                    translationValue);
            }
        }
        return;
    }
}
