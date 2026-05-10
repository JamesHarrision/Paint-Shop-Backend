import { AuthRequest } from "../types/express";
import { Response } from "express";
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  public createOrder = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const { items } = req.body;

      const order = await orderService.createOrder(userId, items);

      return res.status(201).json({
        message: "Đặt hàng thành công",
        data: order
      });

    } catch (error: any) {
      console.error("Create order error:", error.message);
      if (error.message.startsWith('OUT_OF_STOCK')) {
        return res.status(400).json({ message: "Sản phẩm đã hết hàng" });
      }
      if (error.message.startsWith('PRODUCT_NOT_FOUND')) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      return res.status(500).json({ message: "Lỗi server khi đặt hàng" });
    }
  }

  public getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await orderService.getOrdersByUserId(userId, page, limit);

      return res.status(200).json({
        message: "Lấy danh sách đơn hàng thành công",
        ...result
      });
    } catch (error: any) {
      console.error("Get orders error:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public updateStatus = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedOrder = await orderService.updateOrderStatus(Number(id), status);

      return res.status(200).json({
        message: "Cập nhật trạng thái đơn hàng thành công",
        data: updatedOrder
      });
    } catch (error: any) {
      console.error("Update order status error:", error);
      if (error.message === 'ORDER_NOT_FOUND') {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      }
      return res.status(500).json({ message: "Lỗi khi cập nhật trạng thái" });
    }
  }

  public getOrderById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(Number(id));

      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      }

      // Kiểm tra quyền (chỉ chủ đơn hàng hoặc admin mới được xem - admin logic có thể thêm sau)
      if (order.userId !== req.user!.userId && req.user!.role !== 'ADMIN') {
        return res.status(403).json({ message: "Bạn không có quyền xem đơn hàng này" });
      }

      return res.status(200).json({
        message: "success",
        data: order
      });
    } catch (error: any) {
      console.error("Get order detail error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public getAllOrders = async (req: AuthRequest, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await orderService.getAllOrders(page, limit);

      return res.status(200).json({
        message: "Lấy danh sách tất cả đơn hàng thành công",
        ...result
      });
    } catch (error: any) {
      console.error("Get all orders error:", error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
    }
  }
}