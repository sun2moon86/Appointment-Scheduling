// Represents an appointment scheduler
export interface INewFormState {

    // Represent the choices to be displayed in dropdown when the form loads.
    timeslotOptions: string[];

    // Represent the values selected for the fields
    appointmentDate: string;
    timeSlot: string;
    userName: string;
}


// Represents one appointment item in an appointment scheduler.
export interface IPurchaseItem {
    productCode: string;
    quantity: number;
    ratePerUnit: number;
    totalCost: number;
}
