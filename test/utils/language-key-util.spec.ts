import { expect } from 'chai';
import 'mocha';
import { LanguageKeyUtil } from '../../src/utils/language-key-util';

describe('LanguageKeyUtil', () => {
  describe('normalizeLanguageKey', () => {
    it('should return \'a\' when the value \' A \' is submitted', () => {
      expect(LanguageKeyUtil.normalizeLanguageKey(' A ')).to.equal('a');
    });
  });
});
