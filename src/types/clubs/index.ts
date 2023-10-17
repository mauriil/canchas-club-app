
export interface ColorsClub {
  primary: string;
  secondary: string;
}
export interface LocationObject {
  type: string;
  coordinates: number[];
}
export interface Club {
  userId?: string;
  address: string;
  alias: string;
  province: string;
  department: string;
  description: string;
  location: LocationObject;
  reservationMode: string;
  logo: string;
  name: string;
  _id?: string | undefined;
  closedDays: string[];
  colors: ColorsClub;
}