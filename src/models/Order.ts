import type { Product } from './Product';

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

type OrderLog = `Order_${string}_${OrderStatus}`;

interface Order {
    orderId: string;
    userId: string;
    products: Product[];
    totalAmount: number;
    status: OrderStatus;
    log?: OrderLog;
}

export type { Order, OrderStatus, OrderLog };