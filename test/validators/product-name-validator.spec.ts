import { assert, expect } from 'chai';
import 'mocha';
import { ValidationError } from '../../src/errors';
import { ProductNameValidator } from '../../src/validators';

describe('ProductNameValidator', () => {
  describe('function validate', () => {
    it('should throw error when submit empty product name', () => {
      const sut = new ProductNameValidator();
      try {
        sut.validate('');
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });
    it('should not throw an error when valid value is submitted', () => {
      const sut = new ProductNameValidator();
      sut.validate('abc');
    });
  });
});
