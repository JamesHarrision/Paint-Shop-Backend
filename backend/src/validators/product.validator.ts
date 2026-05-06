import { z } from 'zod';

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').optional(),
    description: z.string().optional(),

    price: z.coerce.number().positive('Giá phải lớn hơn 0').optional(),
    stock: z.coerce.number().min(0, 'Stock không được âm').optional(),

    colorCode: z.string().optional(),
  })
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Tên không được để trống' }).min(2),
    price: z.coerce.number({ required_error: 'Giá không được để trống' }).positive(),
    description: z.string().optional(),
    stock: z.coerce.number().min(0).optional(),
    colorCode: z.string().optional(),
  })
});