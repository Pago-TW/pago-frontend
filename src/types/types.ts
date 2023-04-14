export interface Order {
  orderId: string;
  serialNumber: string;
  consumerId: string;
  destinationCountryName: string;
  destinationCityName: string;
  destinationCountryCode: string;
  destinationCityCode: string;
  latestReceiveItemDate: string;
  note: string;
  orderStatus: StatusCode;
  orderItem: OrderItem;
  travelerFee: number;
  tariffFee: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
  hasNewActivity: boolean;
  isPackagingRequired: boolean;
  isVerificationRequired: boolean;
  createDate: string;
  updateDate: string;
  shopper?: Shopper;
  isBidder: boolean;
}

export interface OrderItem {
  orderItemId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  purchaseCountryName: string;
  purchaseCityName: string;
  purchaseCountryCode: string;
  purchaseCityCode: string;
  purchaseDistrict: string;
  purchaseRoad: string;
  fileUrls: string[];
}

export type StatusCode =
  | "REQUESTED"
  | "TO_BE_PURCHASED"
  | "TO_BE_DELIVERED"
  | "DELIVERED"
  | "FINISHED"
  | "CANCELED";

export interface Shopper {
  userId: string;
  fullName: string;
  avatarUrl: string;
  latestDeliveryDate: string;
}

export interface Trip {
  tripId: string;
  shopperId: string;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
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

export interface CountryCityOption {
  country: CountryOption;
  city: CityOption;
}

export interface CountryOption {
  countryCode: string;
  englishName: string;
  chineseName: string;
}

export interface CityOption {
  cityCode: string;
  englishName: string;
  chineseName: string;
}

export type Perspective = "consumer" | "shopper";
