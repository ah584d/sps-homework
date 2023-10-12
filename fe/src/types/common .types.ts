export interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
}
