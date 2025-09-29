import type { User } from '../models/User';

const registerUser = (
    users: User[],
    userData: Omit<User, 'id'>
): Readonly<User>[] => {
    const id = `user_${Date.now()}`;
    const newUser: User = { id, ...userData };
    return [...users, newUser] as Readonly<User>[];
};

const getUserDetails = (
    users: User[],
    userId: string
): Pick<User, 'id' | 'name' | 'email' | 'role'> | undefined => {
    return users.find(u => u.id === userId);
};

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export { registerUser, getUserDetails, getProperty };