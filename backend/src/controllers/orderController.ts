import { AuthRequest } from "../types/express";
import { Response } from "express";
import * as orderService from '../services/orderServices'

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req)?.user?.userId;
    const { items } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User un authenticated. Please login first" });
    }

    const order = await orderService.createOrder(userId, items);

    return res.status(201).json({
      status: "success",
      data: order
    })

  } catch (error: any) {
    if (error.message.includes('out of stock'))
      return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getMyOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User un authenticated. Please login first" });
    }

    const orders = await orderService.getOrderServiceByUserId(userId);

    return res.status(200).json({
      message: "success",
      data: orders
    });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateStatus = async (req: AuthRequest, res: Response) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json('Status is required');
    }

    const updatedOrder = await orderService.updateOrderStatus(Number(id), status);

    return res.status(200).json({
      status: "Order status updated successfully",
      data: updatedOrder
    })

  } catch (error: any) {
    console.log(error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error updating status" });
  }
}