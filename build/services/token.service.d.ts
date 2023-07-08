declare class TokenService {
    getLocalRefreshToken(): any;
    getLocalAccessToken(): any;
    getFromToken(key: string): any;
    updateLocalAccessToken(token: string): void;
    getUser(): any;
    setUser(user: object): void;
    removeUser(): void;
    updateJWTToken(): Promise<void>;
}
declare const tokenService: TokenService;
export default tokenService;
