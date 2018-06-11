export class StringUtil {
    public static isOnlyWhiteSpaces(value: string): boolean {
        return !this.regexIsOnlyWhiteSpaces.test(value);
    }

    private static regexIsOnlyWhiteSpaces: RegExp = new RegExp(/\S/);
}
