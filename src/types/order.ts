import type { User } from "./user";

export interface Order {
  orderId: string;
  serialNumber: string;
  consumer: OrderConsumer;
  destinationCountryName: string;
  destinationCityName: string;
  destinationCountryCode: string;
  destinationCityCode: string;
  latestReceiveItemDate: string;
  note: string;
  orderStatus: OrderStatus;
  orderItem: OrderItem;
  travelerFee: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
  hasNewActivity: boolean;
  isPackagingRequired: boolean;
  isVerificationRequired: boolean;
  createDate: string;
  updateDate: string;
  shopper?: OrderShopper;
  isApplicant: boolean;
  isBidder: boolean;
  hasCancellationRecord: boolean;
  hasPostponeRecord: boolean;
  isPostponed: boolean;
  isCancelled: boolean;
}

export type OrderStatus =
  | "REQUESTED"
  | "TO_BE_PURCHASED"
  | "TO_BE_DELIVERED"
  | "DELIVERED"
  | "FINISHED"
  | "CANCELLED"
  | "TO_BE_CANCELLED"
  | "TO_BE_POSTPONED";

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

export type OrderUser = Pick<User, "userId" | "fullName" | "avatarUrl">;

export type OrderConsumer = OrderUser;

export interface OrderShopper extends OrderUser {
  latestDeliveryDate: string;
}
