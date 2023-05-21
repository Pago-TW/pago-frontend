import type { User } from "./user";

export interface Trip {
  tripId: string;
  shopperId: User["userId"];
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
  tripStatus: TripStatus;
  hasNewActivity: boolean;
  dashboard: Dashboard;
}

export type TripStatus = "ONGOING" | "UPCOMING" | "PAST";

export interface Dashboard {
  requested: number;
  toBePurchased: number;
  toBeDelivered: number;
}
