import RegistryUser from './RegistryUser';

class RegistryEvent {
    public createdUserId: string | null = null;
    public createdUserName: string | null = null;
    public eventName: string | null = null;
    public targetDays: Date[] = [];
    public startDate: Date | Date = new Date();
    public endDate: Date | Date = new Date();
}
export default RegistryEvent;
