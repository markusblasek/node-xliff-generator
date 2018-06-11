import { expect } from 'chai';
import 'mocha';

import { CreateFromCsvConfig } from '../../src/models/create-from-csv-config';
import { LanguageOption } from '../../src/models/language-option';

describe('CreateFromCsvConfig', () => {

  describe('constructor', () => {
    it('should use value for printPretty when submitted value is boolean value', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], true, null, null, null, null);
      expect(sut.printPretty).to.be.equal(true);
    });

    it('should use default value for csvDelimiter when submitted value is null', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], null, null, null, null, null);
      expect(sut.csvDelimiter).to.be.equal(CreateFromCsvConfig.CSV_DELIMITER_DEFAULT_VALUE);
    });

    it('should use default value for csvComment when submitted value is null', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], null, null, null, null, null);
      expect(sut.csvComment).to.be.equal(CreateFromCsvConfig.CSV_COMMENT_DEFAULT_VALUE);
    });

    it('should use default value for csvEscape when submitted value is null', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], null, null, null, null, null);
      expect(sut.csvEscape).to.be.equal(CreateFromCsvConfig.CSV_ESCAPE_DEFAULT_VALUE);
    });

    it('should use default value for csvQuote when submitted value is null', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], null, null, null, null, null);
      expect(sut.csvQuote).to.be.equal(CreateFromCsvConfig.CSV_QUOTE_DEFAULT_VALUE);
    });

    it('should use default value for printPretty when submitted value is null', () => {
      const sut = createCreateFromCsvConfig('projectName', 'csvFile', [], null, null, null, null, null);
      expect(sut.printPretty).to.be.equal(CreateFromCsvConfig.PRINT_PRETTY_DEFAULT_VALUE);
    });

    function createCreateFromCsvConfig(
      projectName: string,
      csvFile: string,
      options: LanguageOption[],
      printPretty: boolean | null | undefined,
      csvDelimiter: string | null | undefined,
      csvComment: string | null | undefined,
      csvEscape: string | null | undefined,
      csvQuote: string | null | undefined): CreateFromCsvConfig {

      return new CreateFromCsvConfig(
        projectName,
        csvFile,
        options,
        printPretty,
        csvDelimiter,
        csvComment,
        csvEscape,
        csvQuote
      );
    }
  });
});
