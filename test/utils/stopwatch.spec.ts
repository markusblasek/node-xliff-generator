import { assert, expect } from 'chai';
import 'mocha';
import { StopWatch } from '../../src/utils';

describe('StopWatch', () => {
  describe('function getElapsedMilliseconds', () => {
    it('should throw an error when getElapsedMilliseconds cannot calculate a time', () => {
      const sw = new StopWatch();
      try {
        sw.getElapsedMilliseconds();
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(Error);
        assert.isNotNull(e);
      }
    });
  });
  describe('start and stop', () => {
    it('should return the elapsed time in ms when start and stop were called', () => {
      const sw = new StopWatch();
      sw.start();
      sw.stop();
      const result = sw.getElapsedMilliseconds();
      expect(result).to.be.gte(0);
    });

    it('should continously stop the time when only start was called and no stop was called', (done) => {
      const sw = new StopWatch();
      sw.start();

      const result = sw.getElapsedMilliseconds();
      setTimeout(() => {
        expect(sw.getElapsedMilliseconds()).to.be.gt(result);
        done();
      }, 2);
    });

    it('should return the elapsed time in ms when only start was called', () => {
      const sw = new StopWatch();
      sw.start();

      const result = sw.getElapsedMilliseconds();
      expect(result).to.be.gte(0);
    });
  });
});
