export interface User {
  userId: string;
  account: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender?: string;
  accountStatus?: string;
  updateDate: string;
  createDate: string;
  aboutMe?: string;
  country?: string;
  lastLogin: string;
  avatarUrl?: string;
  shopperReview: ShopperReview;
  consumerReview: ConsumerReview;
  fullName: string;
  completionRating: string;
  provider: string;
  enabled: boolean;
}

export interface ShopperReview {
  averageRating: number;
  totalReview: number;
  reviewType: string;
}

export interface ConsumerReview {
  averageRating: number;
  totalReview: number;
  reviewType: string;
}
