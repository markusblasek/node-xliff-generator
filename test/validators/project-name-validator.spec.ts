import { assert, expect } from 'chai';
import 'mocha';
import { ValidationError } from '../../src/errors';
import { ProjectNameValidator } from '../../src/validators/project-name-validator';

describe('ProjectNameValidator', () => {
  describe('function validate', () => {
    it('should throw error when submit empty project name', () => {
      const sut = new ProjectNameValidator();
      try {
        sut.validate('');
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });
    it('should not throw an error when valid value is submitted', () => {
      const sut = new ProjectNameValidator();
      sut.validate('abc');
    });
  });
});
