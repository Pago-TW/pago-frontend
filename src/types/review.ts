import type { Order, OrderItem } from "./order";
import type { User } from "./user";

export interface Review {
  reviewId: string;
  creator: ReviewCreator;
  target: ReviewTarget;
  order: ReviewOrder;
  content: string;
  rating: number;
  reviewType: ReviewType;
  createDate: string;
  updateDate: string;
  fileUrls: string[];
}

export type ReviewCreator = Pick<User, "userId" | "fullName" | "avatarUrl">;

export type ReviewTarget = Pick<User, "userId">;

export type ReviewOrder = Pick<Order, "orderId"> & {
  orderItem: Pick<OrderItem, "orderItemId" | "name">;
};

export interface ReviewSummary {
  averageRating: number;
  totalReview: number;
  reviewType: ReviewType;
}

export type ReviewType = "FOR_SHOPPER" | "FOR_CONSUMER";

export interface ShopperReview extends ReviewSummary {
  reviewType: "FOR_SHOPPER";
}

export interface ConsumerReview extends ReviewSummary {
  reviewType: "FOR_CONSUMER";
}
