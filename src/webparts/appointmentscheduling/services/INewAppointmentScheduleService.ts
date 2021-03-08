import { INewFormState } from '../state/INewFormControlsState';

// Represents the service to interact with SharePoint to work with appointment schedule.
export default interface INewAppointmentScheduleService {
    getNewFormControlsState(): Promise<any>;
    createNewAppointmentSchedule(AppointmentScheduleData: INewFormState, siteUrl): Promise<any>;
}