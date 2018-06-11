import { ValidationError } from '../errors';
import { StringUtil } from '../utils/string-util';

export class ProjectNameValidator {
    /**
     * @param projectName {string}
     * @throws {ValidationError} will be thrown if an error during the validation occured
     */
    public validate(projectName: string): void {
        if (StringUtil.isOnlyWhiteSpaces(projectName)) {
            throw new ValidationError(`Value '${projectName}' is not a valid value for a project name`);
        }
    }
}
