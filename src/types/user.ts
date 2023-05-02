import type { ConsumerReview, ShopperReview } from "./review";

export interface User {
  userId: string;
  account: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  accountStatus?: "ACTIVE" | "INACTIVE" | "WARNING";
  updateDate: string;
  createDate: string;
  aboutMe?: string;
  country?: string;
  lastLogin: string;
  avatarUrl?: string;
  shopperReview: ShopperReview;
  consumerReview: ConsumerReview;
  fullName: string;
  completionRating: "EXCELLENT" | "VERY_GOOD" | "GOOD" | "POOR";
  provider: string;
  enabled: boolean;
}
