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