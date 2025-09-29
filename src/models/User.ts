type UserRole = "customer" | "admin";

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type { User, UserRole };