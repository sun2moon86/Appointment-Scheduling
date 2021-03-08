import { SPHttpClient } from '@microsoft/sp-http';
export interface IAppointmentschedulingProps {
  description: string;
  siteUrl: string;
  spHttpClient: SPHttpClient;
}
