import os = require('os');

import { assert, expect } from 'chai';
import 'mocha';
import { CsvParseError } from '../../src/errors';
import { CreateFromCsvConfig } from '../../src/models';
import {
  CsvService,
  FileFakeService,
  LoggerFake
} from '../../src/services';

describe('CsvService', () => {
  const expectedProjectName = 'projectName';
  describe('function parseCsvSync', () => {
    it('should parse the values from the csv file', () => {
      const csvFileAsString = 'key;en;de' + os.EOL +
        'key1;val1En;val2De' + os.EOL;

      const fileService = new FileFakeService();
      fileService.readFileSyncFake = (path, options) => Buffer.from(csvFileAsString);

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      const result = sut.parseCsvSync(config);
      expect(result.length).to.be.equal(2);
      expect(result[0].length).to.be.equal(3);
      expect(result[0][0]).to.be.equal('key');
      expect(result[0][1]).to.be.equal('en');
      expect(result[0][2]).to.be.equal('de');
      expect(result[1].length).to.be.equal(3);
      expect(result[1][0]).to.be.equal('key1');
      expect(result[1][1]).to.be.equal('val1En');
      expect(result[1][2]).to.be.equal('val2De');
    });

    it('should parse the values from the csv file which contains only the header row and no values', () => {
      const csvFileAsString = 'key';

      const fileService = new FileFakeService();
      fileService.readFileSyncFake = (path, options) => Buffer.from(csvFileAsString);

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      const result = sut.parseCsvSync(config);
      expect(result.length).to.be.equal(1);
      expect(result[0].length).to.be.equal(1);
    });

    it('should throw error because csv file is empty', () => {
      const csvFileAsString = '';

      const fileService = new FileFakeService();
      fileService.readFileSyncFake = (path, options) => Buffer.from(csvFileAsString);

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      try {
        sut.parseCsvSync(config);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(CsvParseError);
        assert.isNotNull(e);
      }
    });

    it('should throw error because csv file has not on every row the same number of values', () => {
      const csvFileAsString = 'key;en;de' + os.EOL +
        'key1;val1En;val2De;INVALIDVALUE' + os.EOL;

      const fileService = new FileFakeService();
      fileService.readFileSyncFake = (path, options) => Buffer.from(csvFileAsString);

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      try {
        sut.parseCsvSync(config);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(CsvParseError);
        assert.isNotNull(e);
      }
    });
  });

  describe('function parseCsv', () => {
    it('should parse the values from the csv file', (done) => {
      const csvFileAsString = 'key;en;de' + os.EOL +
        'key1;val1En;val2De' + os.EOL;

      const fileService = new FileFakeService();
      fileService.readFileAsPromiseFake = (path, options) => new Promise((resolve: (data: string | Buffer) => void) => {
        resolve(Buffer.from(csvFileAsString));
      });

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      sut.parseCsv(config)
        .then((result: string[][]) => {
          expect(result.length).to.be.equal(2);
          expect(result[0].length).to.be.equal(3);
          expect(result[0][0]).to.be.equal('key');
          expect(result[0][1]).to.be.equal('en');
          expect(result[0][2]).to.be.equal('de');
          expect(result[1].length).to.be.equal(3);
          expect(result[1][0]).to.be.equal('key1');
          expect(result[1][1]).to.be.equal('val1En');
          expect(result[1][2]).to.be.equal('val2De');
          done();
        })
        .catch((e: any) => {
          assert.fail('An error occured while executing the unittest:' + e);
          done();
        });
    });

    it('should parse the values from the csv file which contains only the header row and no values', (done) => {
      const csvFileAsString = 'key';

      const fileService = new FileFakeService();
      fileService.readFileAsPromiseFake = (path, options) => new Promise((resolve: (data: string | Buffer) => void) => {
        resolve(Buffer.from(csvFileAsString));
      });

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      sut.parseCsv(config)
        .then((result: string[][]) => {
          expect(result.length).to.be.equal(1);
          expect(result[0].length).to.be.equal(1);
          done();
        })
        .catch((e: any) => {
          assert.fail('An error occured while executing the unittest:' + e);
          done();
        });
    });

    it('should throw error because csv file is empty', (done) => {
      const csvFileAsString = '';

      const fileService = new FileFakeService();
      fileService.readFileAsPromiseFake = (path, options) => new Promise((resolve: (data: string | Buffer) => void) => {
        resolve(Buffer.from(csvFileAsString));
      });

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      sut.parseCsv(config)
        .then(() => {
          assert.fail('An error should be thrown');
          done();
        })
        .catch((e: any) => {
          expect(e).to.be.instanceof(CsvParseError);
          assert.isNotNull(e);
          done();
        });
    });

    it('should throw error because csv file has not on every row the same number of values', (done) => {
      const csvFileAsString = 'key;en;de' + os.EOL +
        'key1;val1En;val2De;INVALIDVALUE' + os.EOL;

      const fileService = new FileFakeService();
      fileService.readFileAsPromiseFake = (path, options) => new Promise((resolve: (data: string | Buffer) => void) => {
        resolve(Buffer.from(csvFileAsString));
      });

      const config = getConfigForTests();

      const sut = new CsvService(new LoggerFake(), fileService);

      sut.parseCsv(config)
        .then(() => {
          assert.fail('An error should be thrown');
          done();
        })
        .catch((e: any) => {
          expect(e).to.be.instanceof(CsvParseError);
          assert.isNotNull(e);
          done();
        });
    });
  });

  function getConfigForTests(): CreateFromCsvConfig {
    const config = new CreateFromCsvConfig(
      expectedProjectName,
      'filename',
      [
        { languageKey: 'en', output: '', isSourceLanguage: true },
        { languageKey: 'de', output: '', isSourceLanguage: false }
      ], null, ';');
    return config;
  }
});
