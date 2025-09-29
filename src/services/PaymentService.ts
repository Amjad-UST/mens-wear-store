import type { Payment, PaymentStatus, CardPayment, UPIPayment } from '../models/Payment';
import { ValidationError } from '../models/Errors';

async function processPayment(payment: Payment): Promise<PaymentStatus> {
    return new Promise<PaymentStatus>((resolve, reject) => {
        setTimeout(() => {
            switch (payment.method) {
                case 'card':
                    if ((payment as CardPayment).cardNumber.length === 16) {
                        resolve('completed');
                    } else {
                        reject(new ValidationError('Invalid card details'));
                    }
                    break;
                case 'upi':
                    if ((payment as UPIPayment).upiId.includes('@')) {
                        resolve('completed');
                    } else {
                        reject(new ValidationError('Invalid UPI ID'));
                    }
                    break;
                case 'cod':
                    resolve('pending');
                    break;
                default:
                    reject(new ValidationError('Unknown payment method'));
            }
        }, 1000);
    });
}

export { processPayment };