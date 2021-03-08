import { INewFormState } from '../../state/INewFormControlsState';
import NewAppointmentScheduleService from '../../services/NewAppointmentScheduleService';

// The file contains actions for the  NewAppointmentScheduleReducer

// Gets the choices for dropdown fields in the new form. The values are fetched from the choice field options.
export function GetInitialControlValuesAction() {

    return dispatch => {

        let newAppointmentScheduleServiceObj: NewAppointmentScheduleService = new NewAppointmentScheduleService();
        let formControlsState = { timeslotOptions: [] } as INewFormState;
        newAppointmentScheduleServiceObj.getNewFormControlsState().then((resp: INewFormState) => {
            formControlsState.timeslotOptions = resp.timeslotOptions;
            dispatch({
                type: "GET_DEFAULT_CONTROL_VALUES",
                payload: formControlsState
            });
        });
    };
}

// Creates a new appointment schedule.
export function CreateNewAppoinmentSchedule(AppointmentScheduleData: INewFormState, siteUrl) {
    return dispatch => {

        let newAppointmentScheduleServiceObj: NewAppointmentScheduleService = new NewAppointmentScheduleService();

        newAppointmentScheduleServiceObj.createNewAppointmentSchedule(AppointmentScheduleData, siteUrl).then(response => {
            alert("Appointment created...");
        }).catch(() => {
            alert("Error in creating appointment...");
        });

        dispatch({
            type: "CREATE_NEW_REQUEST",
            payload: AppointmentScheduleData
        });
    };
}
