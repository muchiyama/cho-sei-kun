import HeaderHelper from '@/common/const/HeaderHelper';
import Url from '@/common/const/Url.ts';
import axios from '@/components/wrap/AxiosWrapper';
import JwtHelper from '@/auth/JwtHelper';
import Auth from '@/auth/Auth';

class TokenManager {
    public static manage(httpResponseHeader: any): boolean {

        if (!this.hasAuth()) {
            this.dispose();
        }

        if (this.isLoginSuccessed(httpResponseHeader)) {
            localStorage.setItem(HeaderHelper.POST_AUTH_HEADER, httpResponseHeader[HeaderHelper.HTTP_RESPONSE_AUTH_HEADER]);
            axios.defaults.headers.common[HeaderHelper.POST_AUTH_HEADER] = httpResponseHeader[HeaderHelper.HTTP_RESPONSE_AUTH_HEADER];

            // this.decodeToken(httpResponseHeader[HeaderHelper.HTTP_RESPONSE_AUTH_HEADER]);
            this.decodeToken(this.getToken());
            this.getAuthenticattion();

            return true;
        } else {
            return false;
        }
    }

    public static dispose(): void {
        localStorage.setItem(HeaderHelper.POST_AUTH_HEADER, '');
        axios.defaults.headers.common[HeaderHelper.POST_AUTH_HEADER] = '';
        Auth.dispose();
        JwtHelper.dispose();
    }

    public static hasAuth(): boolean {
        this.decodeToken(this.getToken());
        this.getAuthenticattion();

        if (localStorage.getItem(HeaderHelper.POST_AUTH_HEADER) === undefined || localStorage.getItem(HeaderHelper.POST_AUTH_HEADER) === '' || !this.isTokenValid()) {
            return false;
        } else {
            return true;
        }
    }

    public static getToken(): string {
        const token = localStorage.getItem(HeaderHelper.POST_AUTH_HEADER);
        if (token !== null) {
            return token;
        } else {
            return '';
        }
    }

    public static isGetNextPage(url: string): string {
        if (this.hasAuth()) {
            return url;
        } else {
            return Url.LOGIN_PAGE;
        }
    }

    public static isTokenValid(): boolean {
        this.getAuthenticattion();
        return Auth.isAuthenticated();
    }

    public static getAuthenticattion() {
        // if (JwtHelper.isDecodedSuccess()) {
        this.decodeToken(this.getToken());
        if (JwtHelper.isDecodedSuccess()) {
            const decoded = JwtHelper.claim;
            if (typeof decoded.sub !== undefined && typeof decoded.exp !== undefined) {
                const sub = decoded.sub;
                const exp: number = parseInt(decoded.exp, 0);
                const d = new Date(0);
                d.setUTCSeconds(exp);
                Auth.authenticate(sub, d);
            }
        }
    // }
    }

    private static isLoginSuccessed(httpResponseHeader: any): boolean {
        if (httpResponseHeader[HeaderHelper.HTTP_RESPONSE_AUTH_HEADER] === undefined || httpResponseHeader[HeaderHelper.HTTP_RESPONSE_AUTH_HEADER] === '') {
            return false;
        } else {
            return true;
        }
    }

    private static decodeToken(token: string) {
        JwtHelper.decodeToken(token);
    }

}

export default TokenManager;
