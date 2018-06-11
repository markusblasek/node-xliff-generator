export class CsvParseError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CsvParseError.prototype);
    }
}
