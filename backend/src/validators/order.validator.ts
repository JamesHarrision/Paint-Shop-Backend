import { z } from "zod";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export const checkoutSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      productId: z.number().int().positive("ID sản phẩm không hợp lệ"),
      quantity: z.number().int().positive("Số lượng phải lớn hơn 0")
    })).min(1, "Giỏ hàng không được để trống")
  })
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(OrderStatus, {
      errorMap: () => ({ message: "Trạng thái đơn hàng không hợp lệ" })
    })
  })
});

export const updatePaymentStatusSchema = z.object({
  body: z.object({
    paymentStatus: z.nativeEnum(PaymentStatus, {
      errorMap: () => ({ message: "Trạng thái thanh toán không hợp lệ" })
    })
  })
});
