import { addProduct } from './services/ProductService';
import { placeOrder, updateOrderStatus } from './services/OrderService';
import { processPayment } from './services/PaymentService';
import { getTotalSalesPerCategory, getTop3BestSellers } from './dashboard/AdminDashboard';
import type { Product } from './models/Product';
import type { User } from './models/User';
import type { Order } from './models/Order';
import type { Payment } from './models/Payment';

let products: Product[] = [
    { id: 'p1', title: 'Classic Shirt', price: 40, size: 'M', category: 'Shirt', stock: 10 },
    { id: 'p2', title: 'Formal Trousers', price: 60, size: 'L', category: 'Trousers', stock: 8 },
    { id: 'p3', title: 'Winter Jacket', price: 120, size: 'XL', category: 'Jacket', stock: 5 }
];

let users: User[] = [
    { id: 'u1', name: 'Alice', email: 'alice@email.com', role: 'customer' },
    { id: 'u2', name: 'Bob', email: 'bob@email.com', role: 'admin' }
];

let orders: Order[] = [];

products = addProduct(products, users[1], {
    id: 'p4',
    title: 'Business Suit',
    price: 200,
    size: 'L',
    category: 'Suit',
    stock: 3
});
console.log('Products after admin adds:', products);

orders = placeOrder(orders, users[0].id, [products[0], products[1], products[3]], 10);
console.log('Orders after customer places order - 1:', orders);

orders = placeOrder(orders, users[1].id, [products[0]], 10);
console.log('Orders after customer places order - 2:', orders);

orders = updateOrderStatus(orders, orders[0].orderId, 'confirmed');
console.log('Orders after status update order - 1:', orders);

orders = updateOrderStatus(orders, orders[1].orderId, 'confirmed');
console.log('Orders after status update order - 2:', orders);

const payment: Payment = {
    method: 'card',
    cardNumber: '1234567890123456',
    cardHolder: 'Alice',
    expiry: '12/26',
    cvv: '123',
    amount: orders[0].totalAmount,
    status: 'pending'
};

processPayment(payment)
    .then(status => {
        console.log('Payment processed:', status);
    })
    .catch(err => {
        console.error('Payment error:', err.message);
    });

console.log('Total sales per category:', getTotalSalesPerCategory(orders));
console.log('Top 3 best sellers:', getTop3BestSellers(orders));