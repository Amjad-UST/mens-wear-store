type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
type Category = 'Shirt' | 'Trousers' | 'Jacket' | 'Suit' | 'Accessories';

interface Product {
    id: string;
    title: string;
    price: number;
    size: Size;
    category: Category;
    stock: number;
}

export type { Product, Size, Category };