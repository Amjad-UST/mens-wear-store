import type { Product } from '../models/Product';
import type { User } from '../models/User';
import { CriticalError, ValidationError } from '../models/Errors';

type ProductUpdateDTO = {
    [K in keyof Product]?: Product[K];
};

const isAdmin = (user: User): boolean => user.role === 'admin';

const addProduct = (
    products: Product[],
    user: User,
    product: Product
): Product[] => {
    if (!isAdmin(user)) {
        throw new CriticalError('Only admin can add products').throw();
    }
    return [...products, product];
};

const updateProduct = (
    products: Product[],
    user: User,
    productId: string,
    update: ProductUpdateDTO
): Product[] => {
    if (!isAdmin(user)) {
        throw new CriticalError('Only admin can update products').throw();
    }
    const idx = products.findIndex(p => p.id === productId);
    if (idx === -1) throw new ValidationError('Product not found');
    const updated = { ...products[idx], ...update };
    return products.map((p, i) => (i === idx ? updated : p));
};

const deleteProduct = (
    products: Product[],
    user: User,
    productId: string
): Product[] => {
    if (!isAdmin(user)) {
        throw new CriticalError('Only admin can delete products').throw();
    }
    const idx = products.findIndex(p => p.id === productId);
    if (idx === -1) throw new ValidationError('Product not found');
    return products.filter(p => p.id !== productId);
};

const sortProducts = <T extends keyof Product>(
    products: Product[],
    key: T,
    ascending: boolean = true
): Product[] => {
    return [...products].sort((a, b) => {
        if (a[key] < b[key]) return ascending ? -1 : 1;
        if (a[key] > b[key]) return ascending ? 1 : -1;
        return 0;
    });
};

const filterProducts = <T extends keyof Product>(
    products: Product[],
    key: T,
    value: Product[T]
): Product[] => {
    return products.filter(product => product[key] === value);
};

export {
    addProduct,
    updateProduct,
    deleteProduct,
    sortProducts,
    filterProducts
};