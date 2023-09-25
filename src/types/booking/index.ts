export interface Booking {
    clubId: string;
    createdAt: string;
    fieldId: string;
    paymentId: string;
    recurrent: boolean;
    status: string;
    tenantId: {email: string, name: string, _id: string};
    time: {from: string, to: string, day: string};
    updatedAt: string;
    _id?: string | undefined;
  }