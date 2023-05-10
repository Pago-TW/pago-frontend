import type { ConsumerReview, ShopperReview } from "./review";

export interface User {
  userId: string;
  account: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  gender?: Gender;
  accountStatus?: AccountStatus;
  updateDate: string;
  createDate: string;
  aboutMe?: string;
  country?: string;
  lastLogin: string;
  avatarUrl?: string;
  shopperReview: ShopperReview;
  consumerReview: ConsumerReview;
  fullName: string;
  completionRating: CompletionRating;
  provider: string;
  enabled: boolean;
}

export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

export type AccountStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export type CompletionRating =
  | "EXCELLENT"
  | "VERY_GOOD"
  | "GOOD"
  | "POOR"
  | "NOU";
