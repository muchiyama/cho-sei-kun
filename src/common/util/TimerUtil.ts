class TimerUtil {
    public static delay(ms: number) {
        return new Promise( (resolve) => setTimeout(resolve, ms));
    }
}

export default TimerUtil;
