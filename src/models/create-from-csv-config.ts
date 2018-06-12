import { LanguageOption } from './language-option';

export class CreateFromCsvConfig {
  public static readonly CSV_DELIMITER_DEFAULT_VALUE = ',';
  public static readonly CSV_ESCAPE_DEFAULT_VALUE = '"';
  public static readonly CSV_QUOTE_DEFAULT_VALUE = '"';
  public static readonly CSV_COMMENT_DEFAULT_VALUE = '';
  public static readonly PRINT_PRETTY_DEFAULT_VALUE = false;

  public productName: string;
  public csvFile: string;
  public languageOptions: LanguageOption[];
  public csvDelimiter: string = CreateFromCsvConfig.CSV_DELIMITER_DEFAULT_VALUE;
  public csvComment: string = CreateFromCsvConfig.CSV_COMMENT_DEFAULT_VALUE;
  public csvEscape: string = CreateFromCsvConfig.CSV_ESCAPE_DEFAULT_VALUE;
  public csvQuote: string = CreateFromCsvConfig.CSV_QUOTE_DEFAULT_VALUE;
  public printPretty: boolean = CreateFromCsvConfig.PRINT_PRETTY_DEFAULT_VALUE;

  constructor(
    productName: string,
    csvFile: string,
    options: LanguageOption[],
    printPretty?: boolean | null | undefined,
    csvDelimiter?: string | null | undefined,
    csvComment?: string | null | undefined,
    csvEscape?: string | null | undefined,
    csvQuote?: string | null | undefined) {
    this.productName = productName;
    this.csvFile = csvFile;
    this.languageOptions = options;

    if (!this.isNullOrUndefined(printPretty)) {
      this.printPretty = printPretty as boolean;
    }

    if (!this.isNullOrUndefined(csvDelimiter)) {
      this.csvDelimiter = csvDelimiter as string;
    }
    if (!this.isNullOrUndefined(csvComment)) {
      this.csvComment = csvComment as string;
    }
    if (!this.isNullOrUndefined(csvEscape)) {
      this.csvEscape = csvEscape as string;
    }
    if (!this.isNullOrUndefined(csvQuote)) {
      this.csvQuote = csvQuote as string;
    }
  }

  private isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
  }
}
