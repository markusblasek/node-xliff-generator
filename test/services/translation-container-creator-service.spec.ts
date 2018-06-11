import { expect } from 'chai';
import 'mocha';
import { CreateFromCsvConfig } from '../../src/models';
import {
  LoggerFake,
  TranslationContainerCreatorService
} from '../../src/services';

describe('TranslationContainerCreatorService', () => {
  describe('function createTranslationContainerFromParsedCsvFile', () => {
    it('should create a translation container from the submitted parsed csv values', () => {
      const expectedProjectName = 'projectName';
      const sut = new TranslationContainerCreatorService(new LoggerFake());
      const config = new CreateFromCsvConfig(
        expectedProjectName, 'filename',
        [
          { languageKey: 'en', output: '', isSourceLanguage: true },
          { languageKey: 'de', output: '', isSourceLanguage: false }
        ]);
      const parsedCsvFile: string[][] = [
        ['translationId', 'en', 'de'],
        ['translationId1', 'val1En', 'val1De'],
        ['translationId2', 'val2En', 'val2De']
      ];

      const result = sut.createTranslationContainerFromParsedCsvFile(config, parsedCsvFile);
      expect(result.getProductName()).to.be.equal(expectedProjectName);
      expect(result.getSourceLanguageKey()).to.be.equal('en');
      expect(result.getSupportedLanguageKeys().has('en')).to.be.equal(true);
      expect(result.getSupportedLanguageKeys().has('de')).to.be.equal(true);
      expect(result.getTranslationIds().indexOf('translationId1') > -1).to.be.equal(true);
      expect(result.getTranslationIds().indexOf('translationId2') > -1).to.be.equal(true);

      const translationsKey1 = result.getTranslationsById('translationId1');
      expect(translationsKey1.has('en')).to.be.equal(true);
      expect(translationsKey1.get('en')).to.be.equal('val1En');
      expect(translationsKey1.has('de')).to.be.equal(true);
      expect(translationsKey1.get('de')).to.be.equal('val1De');

      const translationsKey2 = result.getTranslationsById('translationId2');
      expect(translationsKey2.has('en')).to.be.equal(true);
      expect(translationsKey2.get('en')).to.be.equal('val2En');
      expect(translationsKey2.has('de')).to.be.equal(true);
      expect(translationsKey2.get('de')).to.be.equal('val2De');
    });

    it('should create a translation container but contains only submitted language options', () => {
      const expectedProjectName = 'projectName';
      const sut = new TranslationContainerCreatorService(new LoggerFake());
      const config = new CreateFromCsvConfig(
        expectedProjectName, 'filename',
        [
          { languageKey: 'de', output: '', isSourceLanguage: true }
        ]);
      const parsedCsvFile: string[][] = [
        ['translationId', 'en', 'de'],
        ['translationId1', 'val1En', 'val1De'],
        ['translationId2', 'val2En', 'val2De']
      ];

      const result = sut.createTranslationContainerFromParsedCsvFile(config, parsedCsvFile);
      expect(result.getProductName()).to.be.equal(expectedProjectName);
      expect(result.getSourceLanguageKey()).to.be.equal('de');
      expect(result.getSupportedLanguageKeys().has('en')).to.be.equal(false);
      expect(result.getSupportedLanguageKeys().has('de')).to.be.equal(true);
      expect(result.getTranslationIds().indexOf('translationId1') > -1).to.be.equal(true);
      expect(result.getTranslationIds().indexOf('translationId2') > -1).to.be.equal(true);

      const translationsKey1 = result.getTranslationsById('translationId1');
      expect(translationsKey1.has('en')).to.be.equal(false);
      expect(translationsKey1.has('de')).to.be.equal(true);
      expect(translationsKey1.get('de')).to.be.equal('val1De');

      const translationsKey2 = result.getTranslationsById('translationId2');
      expect(translationsKey2.has('en')).to.be.equal(false);
      expect(translationsKey2.has('de')).to.be.equal(true);
      expect(translationsKey2.get('de')).to.be.equal('val2De');
    });

    it('should create a translation container but contains no translations '
      + 'because language key does not appear in parsed csv values', () => {
        const expectedProjectName = 'projectName';
        const sut = new TranslationContainerCreatorService(new LoggerFake());
        const config = new CreateFromCsvConfig(
          expectedProjectName, 'filename',
          [
            { languageKey: 'ru', output: '', isSourceLanguage: true }
          ]);
        const parsedCsvFile: string[][] = [
          ['translationId', 'en', 'de'],
          ['translationId1', 'val1En', 'val1De'],
          ['translationId2', 'val2En', 'val2De']
        ];

        const result = sut.createTranslationContainerFromParsedCsvFile(config, parsedCsvFile);
        expect(result.getProductName()).to.be.equal(expectedProjectName);
        expect(result.getSourceLanguageKey()).to.be.equal('ru');
        expect(result.getSupportedLanguageKeys().has('ru')).to.be.equal(true);
        expect(result.getTranslationIds().length).to.be.equal(0);
      });
  });
});
