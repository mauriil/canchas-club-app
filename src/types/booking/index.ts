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

export interface BookingDetail {
  ownerId: string;
  createdAt?: string;
  paymentId: string;
  fieldId: [{
    availability: [{
      monday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      tuesday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      wednesday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      thursday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      friday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      saturday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
      sunday: [{
        openHour: string;
        closeHour: string;
        price: number;
      }],
    }],
    _id: string;
    name: string;
    description: string;
    photos: string[];
    sport: string;
    fieldType: string;
    floorType: string;
    illumination: boolean;
    clubId: {
      _id: string;
      name: string;
      address: string;
      userId: string;
    }
    createdAt: string;
    updatedAt: string;
  }];
  recurrent: boolean;
  status?: string;
  tenantId: string;
  time: {from: string, to: string, day: string};
  updatedAt?: string;
  _id?: string | undefined;
}