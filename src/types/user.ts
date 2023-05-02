import type { ConsumerReview, ShopperReview } from "./review";

export interface User {
  userId: string;
  googleId?: string;
  account: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender?: Gender;
  accountStatus?: AccountStatus;
  updateDate: string;
  createDate: string;
  aboutMe?: string;
  country?: string;
  lastLogin: string;
  avatarUrl?: string;
  fullName: string;
  provider: string;
  role: string;
  enabled: boolean;
}

export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

export type AccountStatus = "ACTIVE" | "INACTIVE" | "WARNING";

export type CompletionRating = "EXCELLENT" | "VERY_GOOD" | "GOOD" | "POOR";

export interface PublicUser extends Omit<User, "googleId" | "role"> {
  shopperReview: ShopperReview;
  consumerReview: ConsumerReview;
  completionRating: CompletionRating;
}
