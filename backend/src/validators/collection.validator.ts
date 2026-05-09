import { z } from "zod";

export const createCollectionSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Tên bộ sưu tập không được để trống"),
    shortDesc: z.string().max(255, "Mô tả ngắn không được vượt quá 255 ký tự").optional(),
    longDesc: z.string().optional()
  })
});

export const updateCollectionSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Tên bộ sưu tập không được để trống").optional(),
    shortDesc: z.string().max(255, "Mô tả ngắn không được vượt quá 255 ký tự").optional(),
    longDesc: z.string().optional()
  })
});
