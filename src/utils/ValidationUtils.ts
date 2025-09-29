import { ValidationError } from '../models/Errors';

function validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format');
    }
}

function validateNonEmpty(value: string, fieldName: string): void {
    if (!value || value.trim() === '') {
        throw new ValidationError(`${fieldName} cannot be empty`);
    }
}

function validatePositiveNumber(value: number, fieldName: string): void {
    if (typeof value !== 'number' || value <= 0) {
        throw new ValidationError(`${fieldName} must be a positive number`);
    }
}

export { validateEmail, validateNonEmpty, validatePositiveNumber };