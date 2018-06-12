import { LanguageOption } from '..';
import { ValidationError } from '../errors';
import { StringUtil } from '../utils/string-util';

export class LanguageOptionsValidator {
    private static SizeLanguageKeysMin = 0;
    /**
     * @param languageOptions {Array.<LanguageOption>}
     * @throws {ValidationError} will be thrown if an error during the validation occured
     */
    public validate(languageOptions: LanguageOption[]): void {
        let sourceLanguageKey: string = '';
        let containsSingleSourceLanguageKey = false;
        const languageKeys: Set<string> = new Set<string>();
        for (let i = 0, len = languageOptions.length; i < len; ++i) {
            const opt = languageOptions[i];
            this.validateSingleLanguageOption(opt);
            const languageKey = opt.languageKey;
            if (containsSingleSourceLanguageKey === true && opt.isSourceLanguage) {
                throw new ValidationError('The submitted language keys contains multiple source language keys. '
                    + 'Exactly one source language key is allowed. '
                    + `The current language key is '${sourceLanguageKey}'.`);
            }
            if (opt.isSourceLanguage) {
                containsSingleSourceLanguageKey = true;
                sourceLanguageKey = languageKey;
            }
            if (languageKeys.has(languageKey)) {
                throw new ValidationError('The submitted language keys contains '
                    + `the language key '${languageKey}' multiple times.`);
            }
            languageKeys.add(languageKey);
        }
        if (languageKeys.size <= LanguageOptionsValidator.SizeLanguageKeysMin) {
            throw new ValidationError('The submitted value for language keys contains no language keys.');
        }
    }

    private validateSingleLanguageOption(opt: LanguageOption): void {
        if (StringUtil.isOnlyWhiteSpaces(opt.languageKey)) {
            throw new ValidationError('The language key contains only whitespaces');
        }
    }
}
