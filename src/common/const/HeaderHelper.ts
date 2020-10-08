class HeaderHelper {
    public static HTTP_RESPONSE_AUTH_HEADER = 'authorization';
    public static POST_AUTH_HEADER = 'Authorization';
    public static getApiHeader() {
        return {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': localStorage.getItem(HeaderHelper.HTTP_RESPONSE_AUTH_HEADER),
        };
    }
}
export default HeaderHelper;
