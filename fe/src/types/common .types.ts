export interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
}

export interface PropertyPayload {
    id: string;
    category: string;
    imageURL: string;
    propertyName: string;
    userId: string;
    price: number;
}
