import { assert, expect } from 'chai';
import 'mocha';
import moment = require('moment');
import { InvalidArgumentError } from '../../src/errors';
import { TranslationContainer } from '../../src/models/translation-container';
import {
  DateTimeGeneratorFakeService,
  LoggerFake,
  XliffGeneratorService
} from '../../src/services';

describe('XliffGeneratorService', () => {

  const original = 'input/file.csv';
  const productName = 'productname123';
  const datatype = 'plaintext';

  describe('function generateXml', () => {
    it('should create xlif xml content as string with target-language and source-language', () => {
      const sut = createSut();
      const translationContainer = new TranslationContainer(original, productName, datatype, 'en', ['de', 'en']);
      translationContainer.addTranslation('123', 'en', '123Email address of the recipient123');
      translationContainer.addTranslation('123', 'de', '123E-Mail-Adresse des Empfängers123');
      translationContainer.addTranslation('234', 'en', '234Email address of the recipient234');
      translationContainer.addTranslation('234', 'de', '234E-Mail-Adresse des Empfängers234');
      const xmlFileAsString = sut.generateXml(translationContainer, 'de');
      expect(xmlFileAsString).to.be.equal(
        // tslint:disable-next-line:max-line-length
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xliff version="1.0"><file datatype="plaintext" date="2016-12-25T11:34:46.987Z" original="input/file.csv" productname="productname123" source-language="en" target-language="de"><header/><body><trans-unit id="123" xml:space="preserve"><source>123Email address of the recipient123</source><target>123E-Mail-Adresse des Empfängers123</target></trans-unit><trans-unit id="234" xml:space="preserve"><source>234Email address of the recipient234</source><target>234E-Mail-Adresse des Empfängers234</target></trans-unit></body></file></xliff>');
      // tslint:disable-next-line:no-console
      // console.log(xmlFileAsString);
    });

    it('should create xlif xml content as string with no target-language', () => {
      const sut = createSut();
      const translationContainer = new TranslationContainer(original, productName, datatype, 'en', ['de', 'en']);
      translationContainer.addTranslation('123', 'en', '123Email address of the recipient123');
      translationContainer.addTranslation('123', 'de', '123E-Mail-Adresse des Empfängers123');
      translationContainer.addTranslation('234', 'en', '234Email address of the recipient234');
      translationContainer.addTranslation('234', 'de', '234E-Mail-Adresse des Empfängers234');
      const xmlFileAsString = sut.generateXml(translationContainer, 'en');
      expect(xmlFileAsString).to.be.equal(
        // tslint:disable-next-line:max-line-length
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xliff version="1.0"><file datatype="plaintext" date="2016-12-25T11:34:46.987Z" original="input/file.csv" productname="productname123" source-language="en"><header/><body><trans-unit id="123" xml:space="preserve"><source>123Email address of the recipient123</source></trans-unit><trans-unit id="234" xml:space="preserve"><source>234Email address of the recipient234</source></trans-unit></body></file></xliff>');
      // tslint:disable-next-line:no-console
      // console.log(xmlFileAsString);
    });

    it('should throw error because submitted language key '
      + 'is not a supported language key in translation container', () => {
        const sut = createSut();
        const translationContainer = new TranslationContainer(original, productName, datatype, 'en', ['de', 'en']);
        translationContainer.addTranslation('123', 'en', '123Email address of the recipient123');
        translationContainer.addTranslation('123', 'de', '123E-Mail-Adresse des Empfängers123');
        translationContainer.addTranslation('234', 'en', '234Email address of the recipient234');
        translationContainer.addTranslation('234', 'de', '234E-Mail-Adresse des Empfängers234');
        try {
          sut.generateXml(translationContainer, 'ru');
          assert.fail('An error should be thrown');
        } catch (e) {
          expect(e).to.be.instanceof(InvalidArgumentError);
          assert.isNotNull(e);
        }
      });
  });
});

function createSut(): XliffGeneratorService {
  const dtGenerator = new DateTimeGeneratorFakeService();
  dtGenerator.nowFake = () => moment('2016-12-25T12:34:46.987+01:00', 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  return new XliffGeneratorService(new LoggerFake(), dtGenerator);
}
