import { INewFormState } from '../../state/INewFormControlsState';

// Initial state of the purcahse request.
export const newFormControlsInitialState: INewFormState = {
    timeslotOptions: [],
    appointmentDate: "",
    timeSlot: "",
    userName: "",
};

export const NewAppointmentScheduleReducer = (state: INewFormState = newFormControlsInitialState, action) => {
    switch (action.type) {

        // Gets the values for dropdown field from SharePoint list.
        case "GET_DEFAULT_CONTROL_VALUES":

            state = {
                ...state,
                timeslotOptions: action.payload.timeslotOptions
            };

            break;

        // Creates a new appointment schedule.
        case "CREATE_NEW_REQUEST":

            state = {
                ...state,
                timeslotOptions: action.payload.timeslotOptions,
                appointmentDate: action.payload.appointmentDate,
                timeSlot: action.payload.timeSlot,
                userName: action.payload.userName
            };

            break;
    }


    return state;
};