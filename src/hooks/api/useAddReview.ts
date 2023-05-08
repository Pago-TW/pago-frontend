import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { Review } from "@/types/review";
import { useMutation } from "@tanstack/react-query";
import { serialize } from "object-to-formdata";

export type AddReviewData = {
  orderId: Order["orderId"];
  file: File[];
  data: {
    rating: number;
    content?: string;
  };
};

const addReview = async (data: AddReviewData) => {
  const { orderId, ...postData } = data;

  const serializedPostData = serialize(
    {
      file: postData.file,
      data: JSON.stringify(postData.data),
    },
    { noFilesWithArrayNotation: true }
  );

  const res = await axios.post<Review>(
    `/orders/${orderId}/reviews`,
    serializedPostData
  );
  return res.data;
};

export const useAddReview = () => {
  return useMutation({ mutationFn: addReview });
};
