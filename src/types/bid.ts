export interface Bid {
  bidId: string;
  orderId: string;
  creator: Creator;
  trip: Trip;
  bidAmount: number;
  currency: string;
  createDate: string;
  updateDate: string;
  latestDeliveryDate: string;
  bidStatus: string;
}

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

export interface Trip {
  tripId: string;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  arrivalDate: string;
}
