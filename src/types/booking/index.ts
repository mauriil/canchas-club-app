import { Club } from "../clubs";
import { Field } from "../fields";

export interface Booking {
    ownerId: string;
    createdAt?: string;
    fieldId: string;
    paymentId: string;
    recurrent: boolean;
    status?: string;
    tenantId: string;
    time: {from: string, to: string, day: string};
    updatedAt?: string;
    _id?: string | undefined;
  }