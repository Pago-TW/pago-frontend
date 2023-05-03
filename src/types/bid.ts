import type { ReviewCreator, ReviewSummary } from "./review";
import type { Trip } from "./trip";

export interface Bid {
  bidId: string;
  orderId: string;
  creator: BidCreator;
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

export interface BidCreator extends ReviewCreator {
  review: ReviewSummary;
}
