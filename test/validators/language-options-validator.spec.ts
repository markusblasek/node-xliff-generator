import { assert, expect } from 'chai';
import 'mocha';
import { ValidationError } from '../../src/errors';
import { LanguageOption } from '../../src/models/language-option';
import { LanguageOptionsValidator } from '../../src/validators/language-options-validator';

describe('LanguageOptionsValidator', () => {
  describe('function validate', () => {
    it('should throw error when submit empty array', () => {
      const sut = new LanguageOptionsValidator();
      const input: LanguageOption[] = [];
      try {
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when array contains the same language keys', () => {
      const sut = new LanguageOptionsValidator();
      const input: LanguageOption[] = [];
      input.push(new LanguageOption('de', 'dummy/de', true));
      input.push(new LanguageOption('DE', 'dummy/de', false));
      try {
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when array contains multiple source language keys', () => {
      const sut = new LanguageOptionsValidator();
      const input: LanguageOption[] = [];
      input.push(new LanguageOption('de', 'dummy/de', true));
      input.push(new LanguageOption('en', 'dummy/de', true));
      try {
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should throw error when array contains language key with whitespace language key value', () => {
      const sut = new LanguageOptionsValidator();
      const input: LanguageOption[] = [];
      input.push(new LanguageOption('  ', 'dummy/de', true));
      try {
        sut.validate(input);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });

    it('should no throw error when submit valid language options', () => {
      const sut = new LanguageOptionsValidator();
      const input: LanguageOption[] = [];
      input.push(new LanguageOption('de', 'dummy/de', true));
      sut.validate(input);
    });
  });
});
