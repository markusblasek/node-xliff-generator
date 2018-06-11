import builder = require('xmlbuilder');

import { IDateTimeGeneratorService, ILogger } from '.';
import { InvalidArgumentError } from '../errors/invalid-argument.error';
import { TranslationContainer } from '../models';
import { TransUnit } from '../models/xml';
import { LanguageKeyUtil, MapUtil } from '../utils';

export class XliffGeneratorService {

    constructor(private logger: ILogger, private dateTimeGenerator: IDateTimeGeneratorService) { }

    public generateXml(container: TranslationContainer, targetLanguageKey: string, pretty: boolean = false): string {
        this.logger.trace('Enter XliffGeneratorService.generateXml');
        try {
            const fileAttributes: { [s: string]: string; } = {
                'datatype': 'plaintext',
                'date': this.dateTimeGenerator.now().toISOString(),
                'original': 'messages',
                'productname': container.getProductName(),
                'source-language': container.getSourceLanguageKey()
            };
            targetLanguageKey = LanguageKeyUtil.normalizeLanguageKey(targetLanguageKey);
            if (this.hasToUseTargetLanguageKey(container, targetLanguageKey)) {
                if (!container.isLanguageKeySupported(targetLanguageKey)) {
                    throw new InvalidArgumentError(`Language key '${targetLanguageKey}' is no supported. `
                        + 'XML file cannot be created');
                }
                fileAttributes['target-language'] = targetLanguageKey;
            }

            const builderImpl = builder
                .create('xliff', { version: '1.0', encoding: 'UTF-8', standalone: true })
                .att('version', '1.0')
                .ele('file', fileAttributes)
                .ele('header').up()
                .ele('body');
            const transUnits: TransUnit[] = this.createTransUnitsDto(container, targetLanguageKey);
            this.createBodyChilds(builderImpl, transUnits);
            return builderImpl.end({ pretty });
        } finally {
            this.logger.trace('Leave XliffGeneratorService.generateXml');
        }
    }

    private createTransUnitsDto(container: TranslationContainer, targetLanguageKey: string): TransUnit[] {
        const result: TransUnit[] = [];
        const useTargetLanguage = this.hasToUseTargetLanguageKey(container, targetLanguageKey);
        const translationIds = this.getTranslationIdsSorted(container);
        const sourceLanguageKey = container.getSourceLanguageKey();

        for (let i = 0, len = translationIds.length; i < len; ++i) {
            const translationId = translationIds[i];
            const translations = container.getTranslationsById(translationId);
            const translationSource = MapUtil.getNotNullOrNotUndefinedValue(translations, sourceLanguageKey);
            const itemToAdd = new TransUnit(
                translationId,
                translationSource,
                !useTargetLanguage ? undefined : translations.get(targetLanguageKey));
            result.push(itemToAdd);
        }
        return result;
    }

    private getTranslationIdsSorted(container: TranslationContainer): string[] {
        const translationIds = container.getTranslationIds();
        translationIds.sort((a: string, b: string): number => {
            return a.localeCompare(b);
        });
        return translationIds;
    }

    private hasToUseTargetLanguageKey(container: TranslationContainer, targetLanguageKey: string): boolean {
        return targetLanguageKey !== container.getSourceLanguageKey();
    }

    private createBodyChilds(builderImpl: builder.XMLElementOrXMLNode, transUnits: TransUnit[]): void {
        for (let i = 0, len = transUnits.length; i < len; ++i) {
            const transUnit = transUnits[i];
            const tempBuilder = builderImpl.ele('trans-unit',
                {
                    'id': transUnit.id,
                    'xml:space': 'preserve'
                }
            )
                .ele('source', {}, transUnit.source).up();
            if (transUnit.target !== undefined) {
                tempBuilder.ele('target', {}, transUnit.target).up();
            }
            tempBuilder.up();
        }
    }
}
