import * as React from 'react';
import { INewFormState } from '../../state/INewFormControlsState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppointmentschedulingProps } from '../IAppointmentschedulingProps';
import { GetInitialControlValuesAction, CreateNewAppoinmentSchedule } from '../../redux/actions/NewFormControlsValuesAction';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import pnp from 'sp-pnp-js';
import { renderDropDown, renderInput } from '../CustomComponents/FieldRenderers';

// Connected state
interface INewFormConnectedState {

    // Represents a appointment schedule and the data from the form.
    newFormControlValues: INewFormState;

    // Represents the initial values. << Unused now. Useful for edit item feature >>
    initialValues: any;
}

// Represents the connected dispatch
interface INewFormConnectedDispatch {

    // Gets the options for dropdown fields
    getDefaultControlsData: () => void;

    createNewAppointmentSchedule: (AppointmentScheduleData: INewFormState, siteUrl: string) => void;
}

// Validations for the redux form
const required = value => (value ? undefined : ' *');
const number = value =>
    value && isNaN(Number(value)) ? ' Invalid value' : undefined;

class NewRequestComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & IAppointmentschedulingProps & InjectedFormProps<{}, INewFormConnectedState>>{

    constructor(props) {
        super(props);
    }

    public render() {

        return (

            <div>
                {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
                <form onSubmit={this.props.handleSubmit(((values) => this.SubmitForm(values, this.props)))}>
                    <div>
                        <Field component={renderDropDown} label="Select appointment date : " name="appointmentDate" validate={required}>
                            <option key='' value=''></option>
                            {this.props.newFormControlValues.purchasedForOptions.map(purchasedFor => { return <option key={purchasedFor} value={purchasedFor}>{purchasedFor}</option>; })};
                        </Field>
                    </div>
                    <br />
                    <div>
                        <Field component={renderDropDown} label="Select timeslot : " name="timeSlot" validate={required}>
                            <option key='' value=''></option>
                            {this.props.newFormControlValues.timeslotOptions.map(typeOfPr => { return <option key={typeOfPr} value={typeOfPr}>{typeOfPr}</option>; })};
                        </Field>
                    </div>
                    <br />
                    <button type="submit" disabled={this.props.submitting}>Schedule Appointment</button>
                    <br />
                </form>

            </div>
        );
    }

    // Handles the submit form.
    public SubmitForm(values, props) {

        let appointmentScheduleData = {} as INewFormState;
        appointmentScheduleData = values;
        appointmentScheduleData.appointmentDate = props.newFormControlValues.appointmentDate;
        appointmentScheduleData.timeSlot = props.newFormControlValues.timeSlot;

        // Call the connected dispatch to create new purchase request
        props.createNewAppointmentSchedule(appointmentScheduleData, props.siteUrl);
    }


    public componentDidMount() {
        this.props.getDefaultControlsData();
    }
}

// Maps the State to props
const mapStateToProps = (state): INewFormConnectedState => {

    // Includes the initialValues property to load the form with initial values
    return {
        newFormControlValues: state.NewFormControlValues,
        initialValues: state.NewFormControlValues
    };
};

// Maps dispatch to props
const mapDispatchToProps = (dispatch): INewFormConnectedDispatch => {
    return {
        getDefaultControlsData: () => {
            return dispatch(GetInitialControlValuesAction());
        },
        createNewAppointmentSchedule: (appointmentScheduleData: INewFormState, siteUrl: string) => {
            return dispatch(CreateNewAppoinmentSchedule(appointmentScheduleData, siteUrl));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<{}, INewFormConnectedState>(
        {
            form: 'NewPurchaseRequestForm',
            destroyOnUnmount: false,
            // Reinitializes when the state changes. << Unused at the moment. Useful in edit item feature >>
            enableReinitialize: true
        }
    )(NewRequestComponent)
);

