class CriticalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CriticalError';
    }

    public throw(): never {
        throw this;
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export { CriticalError, ValidationError };