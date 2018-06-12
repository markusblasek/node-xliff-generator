import { assert, expect } from 'chai';
import 'mocha';
import { ValidationError } from '../../src/errors';
import { ICreateFromCsvConfig } from '../../src/models';
import {
  CsvFakeService,
  DateTimeGeneratorFakeService,
  FileFakeService,
  LoggerFake,
  MainService,
  TranslationContainerCreatorService,
  XliffGeneratorService,
} from '../../src/services';

describe('MainService', () => {

  const expectedProjectName = 'projectName';
  const outputEn = 'output/en.xml';
  const inputCsvFile = 'input/file.csv';
  const logger = new LoggerFake();
  const dtGenerator = new DateTimeGeneratorFakeService();
  const xlifGenerator = new XliffGeneratorService(logger, dtGenerator);
  const translationContainerService = new TranslationContainerCreatorService(logger);

  describe('function executeSync', () => {
    it('should throw error submitted config is invalid', () => {
      const fileService = new FileFakeService();
      const csvService = new CsvFakeService();
      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [],
        csvFile: inputCsvFile
      };
      try {
        sut.executeSync(config);
        assert.fail('An error should be thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        assert.isNotNull(e);
      }
    });
    it('should create the xml file and write it to fs', () => {
      const fileService = new FileFakeService();
      fileService.writeFileSyncFake = (path, data, options) => {
        expect(path).to.be.equal(outputEn);
        expect(data).to.be.equal(
          // tslint:disable-next-line:max-line-length
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xliff version="1.0"><file datatype="plaintext" date="2016-12-25T11:34:46.987Z" original="input/file.csv" productname="projectName" source-language="en"><header/><body><trans-unit id="key1" xml:space="preserve"><source>val1En</source></trans-unit></body></file></xliff>');
      };

      const csvService = new CsvFakeService();
      csvService.parseCsvSyncFake = () => [
        ['key', 'en', 'de'],
        ['key1', 'val1En', 'val1De']
      ];

      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [
          {
            isSourceLanguage: true,
            languageKey: 'en',
            output: outputEn
          }
        ],
        csvFile: inputCsvFile
      };
      sut.executeSync(config);
    });
  });

  describe('function execute', () => {
    it('should throw error submitted config is invalid', (done) => {
      const fileService = new FileFakeService();
      const csvService = new CsvFakeService();
      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [],
        csvFile: inputCsvFile
      };
      sut.execute(config)
        .then(() => {
          assert.fail('An error should be thrown');
          done();
        })
        .catch((e: any) => {
          expect(e).to.be.instanceof(ValidationError);
          assert.isNotNull(e);
          done();
        });
    });
    it('should create the xml file and write it to fs', (done) => {
      const fileService = new FileFakeService();
      fileService.writeFileAsPromiseFake = (path, data, options) => {
        expect(path).to.be.equal(outputEn);
        expect(data).to.be.equal(
          // tslint:disable-next-line:max-line-length
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xliff version="1.0"><file datatype="plaintext" date="2016-12-25T11:34:46.987Z" original="input/file.csv" productname="projectName" source-language="en"><header/><body><trans-unit id="key1" xml:space="preserve"><source>val1En</source></trans-unit></body></file></xliff>');
        return Promise.resolve();
      };

      const csvService = new CsvFakeService();
      csvService.parseCsv = () => {
        const result = [
          ['key', 'en', 'de'],
          ['key1', 'val1En', 'val1De']
        ];
        return Promise.resolve(result);
      };

      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [
          {
            isSourceLanguage: true,
            languageKey: 'en',
            output: outputEn
          }
        ],
        csvFile: inputCsvFile
      };
      sut.execute(config)
        .then(() => {
          done();
        })
        .catch((e: any) => {
          // tslint:disable-next-line:no-console
          console.log(e);
          assert.fail('An unexpected error was thrown');
          done();
        });
    });
    it('should catch the error when an error while creating the xml file occured', (done) => {
      const fileService = new FileFakeService();
      fileService.writeFileAsPromiseFake = (path, data, options) => {
        return Promise.reject('blafasel');
      };

      const csvService = new CsvFakeService();
      csvService.parseCsv = () => {
        const result = [
          ['key', 'en', 'de'],
          ['key1', 'val1En', 'val1De']
        ];
        return Promise.resolve(result);
      };

      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [
          {
            isSourceLanguage: true,
            languageKey: 'en',
            output: outputEn
          }
        ],
        csvFile: inputCsvFile
      };
      sut.execute(config)
        .then(() => {
          assert.fail('An error should be thrown');
          done();
        })
        .catch((e: any) => {
          expect(e).to.be.equal('blafasel');
          done();
        });
    });
    it('should catch the error when an error while parsing the csv file occured', (done) => {
      const fileService = new FileFakeService();
      fileService.writeFileAsPromiseFake = (path, data, options) => {
        return Promise.resolve();
      };

      const csvService = new CsvFakeService();
      csvService.parseCsv = () => {
        return Promise.reject('csv error');
      };

      const sut = new MainService(logger, fileService, xlifGenerator, csvService, translationContainerService);
      const config: ICreateFromCsvConfig = {
        projectName: expectedProjectName,
        languageOptions: [
          {
            isSourceLanguage: true,
            languageKey: 'en',
            output: outputEn
          }
        ],
        csvFile: inputCsvFile
      };
      sut.execute(config)
        .then(() => {
          assert.fail('An error should be thrown');
          done();
        })
        .catch((e: any) => {
          expect(e).to.be.equal('csv error');
          done();
        });
    });
  });
});
