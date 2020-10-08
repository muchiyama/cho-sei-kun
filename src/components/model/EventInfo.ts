import RegistryUser from './RegistryUser';
import Attendance from './Attendance';

class EventInfo {
    public id: string | null = null;
    public createdUser: RegistryUser = new RegistryUser();
    public eventName: string | string = '';
    public targetDays: Date[] = [];
    public allUserAttendance: Map<string, Attendance[]>  = new Map<string, Attendance[]>();
}
export default EventInfo;
