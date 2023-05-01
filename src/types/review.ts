export interface Review {
  averageRating: number;
  totalReview: number;
  reviewType: "FOR_SHOPPER" | "FOR_CONSUMER";
}

export interface ShopperReview extends Review {
  reviewType: "FOR_SHOPPER";
}

export interface ConsumerReview extends Review {
  reviewType: "FOR_CONSUMER";
}
