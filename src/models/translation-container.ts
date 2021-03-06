import { InvalidArgumentError } from '../errors/invalid-argument.error';

export class TranslationContainer {
    private productName: string;
    private sourceLanguageKey: string = '';
    private translationUnits: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    private supportedLanguageKeys: Set<string> = new Set<string>();
    private original: string;
    private datatype: string;

    public constructor(
        original: string,
        productName: string,
        datatype: string,
        sourceLanguageKey: string,
        supportedLanguageKeys: string[],
    ) {
        if (supportedLanguageKeys.length === 0) {
            throw new InvalidArgumentError('The size of supported language key is zero');
        }
        for (let i = 0, len = supportedLanguageKeys.length; i < len; ++i) {
            this.supportedLanguageKeys.add(supportedLanguageKeys[i]);
        }
        if (!this.supportedLanguageKeys.has(sourceLanguageKey)) {
            throw new InvalidArgumentError(
                `The source language key '${sourceLanguageKey}' is not a supported language key`);
        }
        this.sourceLanguageKey = sourceLanguageKey;
        this.productName = productName;
        this.original = original;
        this.datatype = datatype;
    }

    public getSourceLanguageKey(): string {
        return this.sourceLanguageKey;
    }

    public getProductName(): string {
        return this.productName;
    }

    public getOriginal(): string {
        return this.original;
    }

    public getDatatype(): string {
        return this.datatype;
    }

    public getSupportedLanguageKeys(): Set<string> {
        return this.supportedLanguageKeys;
    }

    public isLanguageKeySupported(languageKey: string): boolean {
        return this.supportedLanguageKeys.has(languageKey);
    }

    /**
     * Add a translation value
     * @param translationId {string}
     * @param languageKey {string}
     * @param value {string}
     */
    public addTranslation(translationId: string, languageKey: string, value: string): void {
        if (!this.isLanguageKeySupported(languageKey)) {
            throw new InvalidArgumentError(`Language key '${languageKey}' is not supported`);
        }

        if (!this.translationUnits.has(translationId)) {
            this.translationUnits.set(translationId, new Map<string, string>());
        }
        const map = this.getTranslationValuesById(translationId);
        map.set(languageKey, value);
    }

    public getTranslationIds(): string[] {
        return Array.from(this.translationUnits.keys());
    }

    /**
     * get the translations of all language keys by translation id.
     * @param translationId {string} id to identify the translations
     * @returns a map of all tranlations.
     * The key of the map is the language key und the corresponding value is the translation value
     * @throws InvalidArgumentError will be thrown if the submitted translationId does not exist
     */
    public getTranslationsById(translationId: string): Map<string, string> {
        return this.getTranslationValuesById(translationId);
    }

    private getTranslationValuesById(translationId: string): Map<string, string> {
        const map = this.translationUnits.get(translationId);
        if (map !== undefined) {
            return map;
        }
        throw new InvalidArgumentError(`Translation id '${translationId}' does not exist`);
    }
}
