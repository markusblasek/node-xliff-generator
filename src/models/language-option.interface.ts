export interface ILanguageOption {
  /**
   * language key to use e.g. en, de etc.
   */
  languageKey: string;
  /**
   * path of the resulting xml file of the language
   */
  output: string;
  /**
   * is it a source language (true) or not (false). If no value is given the default value is false.
   * Exactly one language option has to be true
   */
  isSourceLanguage?: boolean;
}
