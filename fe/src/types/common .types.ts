export interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
}

export interface PropertyPayload {
    _id: string;
    category: string;
    imageURL: string;
    propertyName: string;
    userId: string;
    price: number;
    status: string
}

export interface SignInResponse {
    accessToken: string;
    userId: string;
}
