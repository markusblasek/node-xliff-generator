import { assert, expect } from 'chai';
import 'mocha';
import { ValidationError } from '../../src/errors';
import { CreateFromCsvConfig } from '../../src/models/create-from-csv-config';
import { LanguageOption } from '../../src/models/language-option';
import { CreateFromCsvConfigValidator } from '../../src/validators/create-from-csv-config-validator';

describe('CreateFromCsvConfigValidator', () => {
  describe('function validate', () => {
    it('should not throw any errors when valid value is submitted', () => {
      const sut = new CreateFromCsvConfigValidator();
      const validInput = createCreateFromCsvConfig(
        'productName', 'csvFile', getValidLanguageOptions(), null, null, null, null, null);
      sut.validate(validInput);
    });

    it('should throw error when invalid value for projectName is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          '', 'csvFile', getValidLanguageOptions(), null, null, null, null, null);
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when invalid value for languageOptions is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          'productName', 'csvFile', [], null, null, null, null, null);
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when invalid value for csvDelimiter is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          'productName', 'csvFile', getValidLanguageOptions(), null, 'ab', null, null, null);
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when invalid value for csvComment is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          'productName', 'csvFile', getValidLanguageOptions(), null, null, 'ab', null, null);
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('aaashould throw error when invalid value for csvEscape is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          'productName', 'csvFile', getValidLanguageOptions(), null, null, null, 'ab', null);
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when invalid value for csvQuote is used', () => {
      const sut = new CreateFromCsvConfigValidator();
      try {
        const input = createCreateFromCsvConfig(
          'productName', 'csvFile', getValidLanguageOptions(), null, null, null, null, 'ab');
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    function getValidLanguageOptions(): LanguageOption[] {
      const result: LanguageOption[] = [];
      result.push(new LanguageOption('de', 'dummy/de', true));
      return result;
    }
    function createCreateFromCsvConfig(
      productName: string,
      csvFile: string,
      options: LanguageOption[],
      printPretty: boolean | null | undefined,
      csvDelimiter: string | null | undefined,
      csvComment: string | null | undefined,
      csvEscape: string | null | undefined,
      csvQuote: string | null | undefined): CreateFromCsvConfig {

      return new CreateFromCsvConfig(
        productName,
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
