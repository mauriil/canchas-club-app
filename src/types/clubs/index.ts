
export interface ColorsClub {
  primary: string;
  secondary: string;
}
export interface Club {
  userId?: string;
  address: string;
  alias: string;
  city: string;
  country: string;
  description: string;
  logo: string;
  name: string;
  _id?: string;
  closedDays: string[];
  colors: ColorsClub;
}