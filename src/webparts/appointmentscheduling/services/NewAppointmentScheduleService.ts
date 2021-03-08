import INewAppointmentScheduleService from "./INewAppointmentScheduleService";
import pnp from "sp-pnp-js";
import { INewFormState } from "../state/INewFormControlsState";
import { ItemAddResult, Web } from "sp-pnp-js";

export default class NewAppointmentScheduleService implements INewAppointmentScheduleService {

    private getAppointmentScheduleControlValues(): Promise<any> {
        return pnp.sp.web.fields.getByTitle("appointmentslots").select("Choices").get().then(response => {
            return response;
        });
    }

    // Gets the choices to be displayed in the dropdown fields.
    public getNewFormControlsState(): Promise<any> {
        let newFormControlsState = {} as INewFormState;
        return this.getAppointmentScheduleControlValues().then(appointmentScheduleValuesResponse => {
            newFormControlsState.timeslotOptions = appointmentScheduleValuesResponse.Choices;
        });
    }

    // Creates a new appointment schedule. The request is created in a SharePoint list. 
    public async createNewAppointmentSchedule(AppointmentScheduleData: INewFormState, siteUrl): Promise<any> {
        return pnp.sp.web.lists.getByTitle("Appointments").items.add({
            appointmentDate: AppointmentScheduleData.appointmentDate,
            timeSlot: AppointmentScheduleData.timeSlot,
            userName: AppointmentScheduleData.userName
        })
            .then((result: ItemAddResult) => {
                console.log("Appointment has been added to the list....");
            });
    }
}