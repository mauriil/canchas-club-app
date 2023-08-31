
export interface ColorsClub {
  primary: string;
  secondary: string;
  tertiary: string;
}
export interface Club {
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