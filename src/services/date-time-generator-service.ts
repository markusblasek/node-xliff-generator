import moment = require('moment');
import { Moment } from 'moment';
import { IDateTimeGeneratorService } from './date-time-generator-service.interface';

export class DateTimeGeneratorService implements IDateTimeGeneratorService {
    public now(): Moment {
        return moment();
    }
}
