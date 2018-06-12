import { assert, expect } from 'chai';
import 'mocha';

import { InvalidArgumentError } from '../../src/errors';
import { TranslationContainer } from '../../src/models/translation-container';

describe('TranslationContainer', () => {

  const expectedOriginal = 'input/file.csv';
  const expectedProductName = 'productNameUt';
  const expectedDatatype = 'plaintext';

  describe('constructor', () => {
    it('should add values', () => {
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      expect(sut.getOriginal()).to.be.equal(expectedOriginal);
      expect(sut.getProductName()).to.be.equal(expectedProductName);
      expect(sut.getDatatype()).to.be.equal(expectedDatatype);
      expect(sut.getSourceLanguageKey()).to.be.equal('en');
      expect(sut.getSupportedLanguageKeys().size).to.be.equal(2);
      expect(sut.getSupportedLanguageKeys().has('en')).to.be.equal(true);
      expect(sut.getSupportedLanguageKeys().has('de')).to.be.equal(true);
    });

    it('should throw error when source language key is not in supported language key array', () => {
      try {
        getSut(expectedOriginal, expectedProductName, expectedDatatype, 'ru', ['en', 'de']);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(InvalidArgumentError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when supported language key array is empty', () => {
      try {
        getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', []);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(InvalidArgumentError);
        assert.isNotNull(e);
      }
    });
  });

  describe('function isLanguageKeySupported', () => {
    it('should return true when language key exists in supported language keys', () => {
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      expect(sut.isLanguageKeySupported('en')).to.be.equal(true);
    });

    it('should return false when language key does not exist in supported language keys', () => {
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      expect(sut.isLanguageKeySupported('ru')).to.be.equal(false);
    });
  });

  describe('function getTranslationIds', () => {
    it('should return all translation ids', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      sut.addTranslation(expectedTransId, 'en', 'valTransId1En');
      sut.addTranslation(expectedTransId, 'de', 'valTransId1De');
      const transIds = sut.getTranslationIds();
      expect(transIds.length).to.be.equal(1);
      expect(transIds[0]).to.be.equal(expectedTransId);
    });
  });

  describe('function addTranslation', () => {
    it('should add translation values', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      sut.addTranslation(expectedTransId, 'en', 'valTransId1En');
      sut.addTranslation(expectedTransId, 'de', 'valTransId1De');
      const transIds = sut.getTranslationIds();
      expect(transIds.length).to.be.equal(1);
      expect(transIds[0]).to.be.equal(expectedTransId);
    });
  });

  describe('function getTranslationsById', () => {
    it('should return translation values', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      sut.addTranslation(expectedTransId, 'en', 'valTransId1En');
      sut.addTranslation(expectedTransId, 'de', 'valTransId1De');
      const translations = sut.getTranslationsById(expectedTransId);
      expect(translations.has('en')).to.be.equal(true);
      expect(translations.has('de')).to.be.equal(true);
      expect(translations.get('en')).to.be.equal('valTransId1En');
      expect(translations.get('de')).to.be.equal('valTransId1De');
    });

    it('should throw error when translation id not exist', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      sut.addTranslation(expectedTransId, 'en', 'valTransId1En');
      sut.addTranslation(expectedTransId, 'de', 'valTransId1De');
      try {
        sut.getTranslationsById('blafasel');
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(InvalidArgumentError);
        assert.isNotNull(e);
      }
    });
  });

  describe('function getTranslationsById', () => {
    it('should return translation values', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      sut.addTranslation(expectedTransId, 'en', 'valTransId1En');
      sut.addTranslation(expectedTransId, 'de', 'valTransId1De');
      const translations = sut.getTranslationsById(expectedTransId);
      expect(translations.has('en')).to.be.equal(true);
      expect(translations.has('de')).to.be.equal(true);
      expect(translations.get('en')).to.be.equal('valTransId1En');
      expect(translations.get('de')).to.be.equal('valTransId1De');
    });

    it('should throw error when language key is not supported', () => {
      const expectedTransId = 'transId1';
      const sut = getSut(expectedOriginal, expectedProductName, expectedDatatype, 'en', ['en', 'de']);
      try {
        sut.addTranslation(expectedTransId, 'ru', 'valTransId1Ru');
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(InvalidArgumentError);
        assert.isNotNull(e);
      }
    });
  });
});

function getSut(
  original: string,
  productName: string,
  datatype: string,
  sourceLanguageKey: string,
  supportedLanguageKeys: string[]): TranslationContainer {
  return new TranslationContainer(original, productName, datatype, sourceLanguageKey, supportedLanguageKeys);
}
