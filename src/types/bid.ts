import type { Review } from "./review";
import type { Trip } from "./trip";
import type { PublicUser } from "./user";

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

export interface Creator
  extends Pick<PublicUser, "userId" | "fullName" | "avatarUrl"> {
  review: Review;
}
