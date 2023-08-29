export interface hourInterface {
    openHour: string, closeHour: string, price: number
}

export interface Field {
    _id?: string;
    name: string;
    description: string,
    photos: string[],
    sport: string,
    fieldType: string,
    floorType: string,
    illumination: boolean,
    availability: {
      monday: hourInterface[],
      tuesday: hourInterface[],
      wednesday: hourInterface[],
      thursday: hourInterface[],
      friday: hourInterface[],
      saturday: hourInterface[],
      sunday: hourInterface[],
    },
    clubId: string,
}