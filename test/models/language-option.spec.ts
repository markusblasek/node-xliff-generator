import { expect } from 'chai';
import 'mocha';

import { LanguageOption } from '../../src/models/language-option';

describe('LanguageOption', () => {
  describe('constructor', () => {
    it('should use value for printPretty when submitted value is boolean value', () => {
      const sut = new LanguageOption('en', 'output/file');
      expect(sut.languageKey).to.be.equal('en');
      expect(sut.output).to.be.equal('output/file');
      expect(sut.isSourceLanguage).to.be.equal(false);
    });
  });
});
