export interface Trip {
  tripId: string;
  shopperId: string;
  fromCountry: string;
  fromCountryChineseName: string;
  fromCity: string;
  fromCityChineseName: string;
  toCountry: string;
  toCountryChineseName: string;
  toCityChineseName: string;
  toCity: string;
  arrivalDate: string;
  profit: number;
  currency: string;
  createDate: string;
  updateDate: string;
  tripStatus: string;
  hasNewActivity: boolean;
  dashboard: Dashboard;
}

export interface Dashboard {
  requested: number;
  toBePurchased: number;
  toBeDelivered: number;
}
