import { AttendState } from '@/common/enum/AttendState';

class UserAttendance {
    public userName: string | null = null;
    public attendState: AttendState | null = null;
    public attendDate: Date | null = null;
}
export default UserAttendance;
