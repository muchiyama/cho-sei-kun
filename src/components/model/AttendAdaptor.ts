import { AttendState } from '@/common/enum/AttendState';

class AttendAdaptor {
    // public targetUserName: string | null = null;
    public eventId: string | string = '';
    public userName: string | string = '';
    public targetDate: Date | Date = new Date();
    public state: AttendState | AttendState = AttendState.Absent;
    public id: string | string = '';
}
export default AttendAdaptor;
