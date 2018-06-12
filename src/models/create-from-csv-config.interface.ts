import { ILanguageOption } from '.';

export interface ICreateFromCsvConfig {
  /** Product name used in the the xlif file */
  productName: string;
  /** Path to the csv file to read in the translation values */
  csvFile: string;
  /** Language options */
  languageOptions: ILanguageOption[];
  /** delimiter character of the csv file. If entered it has to be exactly one character */
  csvDelimiter?: string | null | undefined;
  /** comment character of the csv file. If entered it has to be exactly one character */
  csvComment?: string | null | undefined;
  /** escape character of the csv file. If entered it has to be exactly one character */
  csvEscape?: string | null | undefined;
  /** quote character of the csv file. If entered it has to be exactly one character */
  csvQuote?: string | null | undefined;
  /** true if all xml files should be printed pretty; otherwise they are not printed pretty */
  printPretty?: boolean | null | undefined;
}
