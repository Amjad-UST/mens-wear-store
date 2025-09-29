import type { Category } from '../models/Product';
import type { Order } from '../models/Order';

function getTotalSalesPerCategory(orders: Order[]): Record<Category, number> {
    const sales: Record<Category, number> = {
        Shirt: 0,
        Trousers: 0,
        Jacket: 0,
        Suit: 0,
        Accessories: 0
    };
    for (const order of orders) {
        for (const product of order.products) {
            sales[product.category] += product.price;
        }
    }
    return sales;
}

function getTop3BestSellers(orders: Order[]): ReadonlyArray<{ productId: string; title: string; sold: number }> {
    const productSales: Record<string, { title: string; sold: number }> = {};
    for (const order of orders) {
        for (const product of order.products) {
            if (!productSales[product.id]) {
                productSales[product.id] = { title: product.title, sold: 0 };
            }
            productSales[product.id].sold += 1;
        }
    }
    const sorted = Object.entries(productSales)
        .sort(([, a], [, b]) => b.sold - a.sold)
        .slice(0, 3)
        .map(([productId, data]) => ({ productId, ...data }));
    return sorted as ReadonlyArray<{ productId: string; title: string; sold: number }>;
}

export { getTotalSalesPerCategory, getTop3BestSellers };