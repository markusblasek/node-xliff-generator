export class LanguageKeyUtil {
    public static normalizeLanguageKey(value: string): string {
        return value.trim().toLowerCase();
    }
}
