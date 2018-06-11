import { ValidationError } from '../errors';
import { CreateFromCsvConfig } from '../models';
import { LanguageOptionsValidator, ProjectNameValidator } from './';

export class CreateFromCsvConfigValidator {
    /**
     * @param config {CreateFromCsvConfig} instance to validate
     * @throws {ValidationError} will be thrown if an error during the validation occured
     */
    public validate(config: CreateFromCsvConfig): void {
        if (this.isNullOrUndefined(config.csvComment) || !this.hasZeroOrOneCharacter(config.csvComment)) {
            throw new ValidationError('Value for parameter \'csvCommet\' contains more than one character');
        }

        if (this.isNullOrUndefined(config.csvDelimiter) || !this.hasExactlyOneCharacter(config.csvDelimiter)) {
            throw new ValidationError('Value for parameter \'csvDelimiter\' contains not exaclty one character');
        }

        if (this.isNullOrUndefined(config.csvEscape) || !this.hasExactlyOneCharacter(config.csvEscape)) {
            throw new ValidationError('Value for parameter \'csvEscape\' contains not exaclty one character');
        }

        if (this.isNullOrUndefined(config.csvQuote) || !this.hasExactlyOneCharacter(config.csvQuote)) {
            throw new ValidationError('Value for parameter \'csvQuote\' contains not exaclty one character');
        }

        const langOptionsValidator = new LanguageOptionsValidator();
        langOptionsValidator.validate(config.languageOptions);
        const projectNameValidator = new ProjectNameValidator();
        projectNameValidator.validate(config.projectName);
    }

    private isNullOrUndefined(value: any): boolean  {
        return value === null || value === undefined;
    }
    private hasZeroOrOneCharacter(value: string): boolean {
        return value.length === 0 || this.hasExactlyOneCharacter(value);
    }

    private hasExactlyOneCharacter(value: string): boolean {
        return value.length === 1;
    }
}
