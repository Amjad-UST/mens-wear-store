import type { Order, OrderStatus, OrderLog } from '../models/Order';
import type { Product } from '../models/Product';
import { ValidationError } from '../models/Errors';

type Discount = number;

const placeOrder = (
    orders: Order[],
    userId: string,
    products: Product[],
    discount?: Discount
): Order[] => {
    const total = products.reduce((sum, p) => sum + p.price, 0);
    const isValidDiscount: boolean = discount !== undefined && discount > 0;
    const finalAmount = isValidDiscount ? total - (discount ?? 0) : total;

    const orderId = `order_${Date.now()}`;
    const status: OrderStatus = 'pending';
    const log: OrderLog = `Order_${orderId}_${status}`;

    const newOrder: Order = {
        orderId,
        userId,
        products,
        totalAmount: finalAmount,
        status,
        log
    };

    return [...orders, newOrder];
};

const updateOrderStatus = (
    orders: Order[],
    orderId: string,
    newStatus: OrderStatus
): Order[] => {
    const idx = orders.findIndex(o => o.orderId === orderId);
    if (idx === -1) throw new ValidationError('Order not found');
    const updatedOrder: Order = {
        ...orders[idx],
        status: newStatus,
        log: `Order_${orderId}_${newStatus}`
    };
    return orders.map((o, i) => (i === idx ? updatedOrder : o));
};

export { placeOrder, updateOrderStatus };