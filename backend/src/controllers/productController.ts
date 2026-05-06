import { Request, Response } from "express";
import * as productService from '../services/productService'
import { prisma } from "../config/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const params = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    };

    const result = await productService.getProducts(params);
    res.status(200).json({ message: 'Success', ...result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const product = await productService.getProductById(id);
    res.status(200).json({ data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = await productService.createProduct({
      name,
      price: Number(price),
      description,
      stock: stock ? Number(stock) : undefined,
      imageUrl: req.file?.path || '',
    });
    res.status(201).json({ message: 'Product created', data: product });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedProduct = await productService.updateProduct(id, updateData);

    return res.status(200).json({
      status: 'Product updated',
      data: updatedProduct
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await productService.deleteProduct(Number(id));
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting or product not found" });
  }
}