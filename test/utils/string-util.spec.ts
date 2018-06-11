import { expect } from 'chai';
import 'mocha';
import { StringUtil } from '../../src/utils/string-util';

describe('StringUtil', () => {
  describe('isOnlyWhiteSpaces', () => {
    it('should return true when the value \'   \' is used', () => {
      expect(StringUtil.isOnlyWhiteSpaces('  ')).to.equal(true);
    });

    it('should return true when the value \'a\' is used', () => {
      expect(StringUtil.isOnlyWhiteSpaces('a')).to.equal(false);
    });
  });
});
