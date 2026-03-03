import { Request, Response } from "express";
import * as productService from '../services/productService'
import { prisma } from "../config/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Lấy tham số từ Query String (?page=1&limit=10)
    const params = {
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      search: req.query.search as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    }

    const result = await productService.getProducts(params);
    res.status(200).json({
      message: 'Success',
      data: result.data,
      pagination: result.pagination
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    //Cần validate xem phải là number ko 

    const product = await productService.getProductById(id);
    res.status(200).json({ data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

//Admin only
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Basic validation 
    if (!req.body.name || !req.body.price) {
      res.status(400).json({ message: 'Name and price are required' });
      return;
    }

    const { name, price, description, stock } = req.body;
    let imageUrl = '';

    // Lấy URL từ Cloudinary
    if (req.file) {
      imageUrl = req.file.path;
    }

    const product = await productService.createProduct(
      {
        name,
        price: Number(price),
        description,
        imageUrl,
        stock,
      }
    );
    res.status(201).json({ message: 'Product created', data: product });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock, colorCode } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Build update data object dynamically
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (colorCode !== undefined) updateData.colorCode = colorCode;

    // Nếu có upload ảnh mới
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData
    });

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
    await prisma.product.delete({
      where: { id: Number(id) }
    })
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting or product not found" });
  }
}