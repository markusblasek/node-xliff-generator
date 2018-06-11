import { assert, expect } from 'chai';
import 'mocha';
import { MapUtil } from '../../src/utils/map-util';

describe('MapUtil', () => {
  describe('getNotNullOrNotUndefinedValue', () => {
    it('should return the value of the key', () => {
      const input = new Map<string, string>();
      input.set('key', 'val');
      expect(MapUtil.getNotNullOrNotUndefinedValue(input, 'key')).to.equal('val');
    });

    it('should throw error if key does not exist in map', () => {
      const input = new Map<string, string>();
      try {
        MapUtil.getNotNullOrNotUndefinedValue(input, 'key');
        assert.fail('An error should be thrown');
      } catch (e) {
        assert.isNotNull(e);
      }
    });
  });
});
