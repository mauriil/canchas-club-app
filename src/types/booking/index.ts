import { Club } from "../clubs";
import { Field } from "../fields";

export interface Booking {
    clubId: Club;
    createdAt: string;
    fieldId: Field;
    paymentId: string;
    recurrent: boolean;
    status: string;
    tenantId: {email: string, name: string, _id: string};
    time: {from: string, to: string, day: string};
    updatedAt: string;
    _id?: string | undefined;
  }