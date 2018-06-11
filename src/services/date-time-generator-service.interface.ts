import { Moment } from 'moment';

export interface IDateTimeGeneratorService {
    now(): Moment;
}
