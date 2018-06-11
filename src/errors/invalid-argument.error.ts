export class InvalidArgumentError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }
}
