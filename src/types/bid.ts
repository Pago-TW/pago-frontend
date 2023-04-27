import type { Trip } from "./trip";

export interface Bid {
  bidId: string;
  orderId: string;
  creator: Creator;
  trip: Pick<
    Trip,
    | "tripId"
    | "fromCountry"
    | "fromCity"
    | "toCountry"
    | "toCity"
    | "arrivalDate"
  >;
  bidAmount: number;
  currency: string;
  createDate: string;
  updateDate: string;
  latestDeliveryDate: string;
  bidStatus: BidStatus;
}

export type BidStatus = "NOT_CHOSEN" | "IS_CHOSEN";

export interface Creator {
  userId: string;
  fullName: string;
  avatarUrl?: string;
  review: Review;
}

export interface Review {
  averageRating: number;
  totalReview: number;
  reviewType: string;
}
