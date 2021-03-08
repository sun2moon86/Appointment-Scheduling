import * as React from 'react';
import { IAppointmentschedulingProps } from './IAppointmentschedulingProps';
import ConfigureStore from "../redux/store/ConfigureStore";
import { connect } from "react-redux";
import { INewFormState } from "../state/INewFormControlsState";
import { Provider } from "react-redux";
import NewAppointmentComponent from "../components/CraeteAppointment/CreateNewAppointmentComponent";

export default class Appointmentscheduling extends React.Component<IAppointmentschedulingProps, {}> {


  public render(): React.ReactElement<IAppointmentschedulingProps> {
    // Initialize the redux store
    const appointmentStore = ConfigureStore();

    return (
      <Provider store={appointmentStore}>

      </Provider>

    );
  }
}
