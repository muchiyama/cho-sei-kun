import Auth from '@/auth/Auth';

const headerStruct = {alg: ''};
const claimStruct = {sub: '', exp: ''};

class JwtHelper {
    public static header = headerStruct;
    public static claim = claimStruct;

    public static isDecodedSuccess(): boolean { return this.isDecoded; }

    public static decodeToken(token: string) {
        try {
            this.splitToken(token);
            this.header = JSON.parse(this.base64Decode(this.headerToken));
            this.claim =  JSON.parse(this.base64Decode(this.claimToken));
            this.isDecoded = true;
        } catch (error) {
            this.dispose();
        }
    }

    public static dispose(): void {
        this.headerToken = '';
        this.claimToken = '';

        this.header = headerStruct;
        this.claim = claimStruct;

        this.isDecoded = false;
    }

    private static headerToken: string;
    private static claimToken: string;
    private static isDecoded = false;
    private static REG_BEARER = '^Bearer\\s';



    private static base64Decode(token: string) {
        return decodeURIComponent(escape(atob(token)));
    }

    private static splitToken(token: string) {
        const REGEXP_BEARER = new RegExp(this.REG_BEARER);

        const tmpTokens = token.replace(REGEXP_BEARER, '').split('\.');

        this.headerToken = tmpTokens[0];
        this.claimToken = tmpTokens[1];
    }
}
export default JwtHelper;
