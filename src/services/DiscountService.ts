import { ValidationError } from '../models/Errors';

class DiscountService<T extends { price: number }> {
    applyDiscount(item: T, discount: number): number {
        if (discount < 0 || discount > item['price']) {
            throw new ValidationError('Invalid discount amount');
        }
        return item['price'] - discount;
    }

    applyDiscountToAll(items: T[], discount: number): number[] {
        return items.map(item => this.applyDiscount(item, discount));
    }
}

export { DiscountService };