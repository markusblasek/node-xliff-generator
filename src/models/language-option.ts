export class LanguageOption {
  public languageKey: string;
  public output: string;
  public isSourceLanguage: boolean;

  constructor(languageKey: string, output: string, isSourceLanguage: boolean = false) {
    this.languageKey = languageKey;
    this.output = output;
    this.isSourceLanguage = isSourceLanguage;
  }
}
