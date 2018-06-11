import moment = require('moment');
import { Moment } from 'moment';
import { IDateTimeGeneratorService } from './date-time-generator-service.interface';

export class DateTimeGeneratorFakeService implements IDateTimeGeneratorService {
    public nowFake: () => Moment = () => moment('2016-12-25T12:34:46.987+01:00', 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    public now(): Moment {
        return this.nowFake();
    }
}
