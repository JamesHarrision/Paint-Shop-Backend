import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Rating thấp nhất là 1").max(5, "Rating cao nhất là 5")
    ),
    comment: z.string().optional()
  })
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.preprocess(
      (val) => (val === undefined ? undefined : Number(val)),
      z.number().min(1, "Rating thấp nhất là 1").max(5, "Rating cao nhất là 5").optional()
    ),
    comment: z.string().optional()
  })
});
