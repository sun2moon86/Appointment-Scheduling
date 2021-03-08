import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AppointmentschedulingWebPartStrings';
import Appointmentscheduling from './components/Appointmentscheduling';
import { IAppointmentschedulingProps } from './components/IAppointmentschedulingProps';

export interface IAppointmentschedulingWebPartProps {
  description: string;
}

export default class AppointmentschedulingWebPart extends BaseClientSideWebPart<IAppointmentschedulingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAppointmentschedulingProps> = React.createElement(
      Appointmentscheduling,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
