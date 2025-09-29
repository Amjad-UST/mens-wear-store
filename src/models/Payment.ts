type PaymentStatus = 'pending' | 'completed' | 'failed';

interface CardPayment {
    method: 'card';
    cardNumber: string;
    cardHolder: string;
    expiry: string;
    cvv: string;
    amount: number;
    status: PaymentStatus;
}

interface UPIPayment {
    method: 'upi';
    upiId: string;
    amount: number;
    status: PaymentStatus;
}

interface CODPayment {
    method: 'cod';
    amount: number;
    status: PaymentStatus;
}

type Payment = CardPayment | UPIPayment | CODPayment;

export type { Payment, CardPayment, UPIPayment, CODPayment, PaymentStatus };