import { ValidationError } from '../errors';
import { StringUtil } from '../utils/string-util';

export class ProductNameValidator {
    /**
     * @param productName {string}
     * @throws {ValidationError} will be thrown if an error during the validation occured
     */
    public validate(productName: string): void {
        if (StringUtil.isOnlyWhiteSpaces(productName)) {
            throw new ValidationError(`Value '${productName}' is not a valid value for a product name`);
        }
    }
}
