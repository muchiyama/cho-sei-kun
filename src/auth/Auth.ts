import TokenManager from './TokenManager';

class Auth {
    public static authenticate(email: string, exp: Date) {
        this.email = email;
        this.exp = exp;
        this.authentication = true;
    }

    public static setEmail(email: string) {
        this.email = email;
    }

    public static setExp(exp: Date) {
        this.exp = exp;
    }

    public static getEmail(): string {
        return this.email;
    }

    public static getExp(): Date {
        return this.exp;
    }

    public static isAuthenticated(): boolean {
        if (new Date() < this.exp) {
            return true;
        } else {
            return false;
        }
    }

    public static dispose() {
        this.email = '';
        this.exp = new Date(0);
        this.authentication = false;
    }

    private static email: string;
    private static exp: Date;
    private static authentication: boolean;
}
export default Auth;
