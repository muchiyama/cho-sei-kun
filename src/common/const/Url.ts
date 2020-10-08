class Url {
    public static API_BASE_URL = 'http://localhost:8080';

    public static USER_API = Url.API_BASE_URL + '/cohusei.com/v1/users';
    public static EVENT_API = Url.API_BASE_URL + '/cohusei.com/v1/event';
    public static LOGIN_API = Url.API_BASE_URL + '/cohusei.com/v1/login';
    public static ALL_EVENT_API = Url.API_BASE_URL + '/cohusei.com/v1/allEvent';
    public static USER_ATTENDANCE_API = Url.API_BASE_URL + '/cohusei.com/v1/userAtendance';

    public static APP_BASE_URL = 'http://localhost:8081';
    public static EVENT_PAGE = '/EventPage';
    public static SELECT_EVENT_PAGE = '/SelectEvent';
    public static EVENT_REGISTRY_PAGE = '/EventRegistry';
    public static LOGIN_FAILED = '/LoginFailed';
    public static LOGIN_PAGE = '/login';

    public static EVENT_PAGE_NAME = 'EventPage';
}

export default Url;
