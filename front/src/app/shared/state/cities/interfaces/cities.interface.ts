export interface ICity {
  _id: string;
  city_name: string;
  foundation_year: number;
  is_city_active: boolean;
}

export const cityKey = 'cities';

export const initialCityState: ICity[] = [];
