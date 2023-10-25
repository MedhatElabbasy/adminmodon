import { Country } from './country';

export interface City {
  id: number;
  name: string;
  nameEN: string;
  isDeleted: boolean;
  countryId: number;
  country: Country;
}
