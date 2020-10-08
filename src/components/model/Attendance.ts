import { AttendState } from '@/common/enum/AttendState';

class Attendance {
    // public targetUserName: string | null = null;
    public date: Date;
    public userState: AttendState;

    constructor(d: Date, state?: AttendState);
    constructor(date: Date, state?: AttendState) {
        this.date = date === undefined ? new Date() : date;

        if (state === null || state === undefined) {
            this.userState = AttendState.Absent;
        } else {
            this.userState = state;
        }
    }

}
export default Attendance;
