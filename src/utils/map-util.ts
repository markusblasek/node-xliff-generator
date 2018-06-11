export class MapUtil {
    public static getNotNullOrNotUndefinedValue<T, U>(value: Map<T, U>, key: T): U {
        const result = value.get(key);
        if (result !== null && result !== undefined) {
            return result;
        }
        throw new Error('key does not exist in map');
    }
}
