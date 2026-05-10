import { Request, Response } from "express";
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
  public getAllProducts = async (req: Request, res: Response) => {
    try {
      const params = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };

      const result = await productService.getProducts(params);
      res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công',
        ...result
      });
    } catch (error: any) {
      console.error("Get all products error:", error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" });
    }
  }

  public getProductDetail = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      res.status(200).json({
        message: "Lấy chi tiết sản phẩm thành công",
        data: product
      });
    } catch (error: any) {
      console.error("Get product detail error:", error);
      res.status(500).json({ message: "Lỗi khi lấy chi tiết sản phẩm" });
    }
  }

  public createProduct = async (req: Request, res: Response) => {
    try {
      const { name, price, description, stock, colorCode } = req.body;

      const product = await productService.createProduct({
        name,
        price: Number(price),
        description,
        stock: stock ? Number(stock) : undefined,
        imageUrl: req.file?.path || '',
        colorCode,
      });
      res.status(201).json({ message: 'Tạo sản phẩm thành công', data: product });
    } catch (error: any) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "Lỗi khi tạo sản phẩm" });
    }
  }

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, price, description, stock, colorCode } = req.body;
      const updateData: any = { name, description, colorCode };

      if (req.file) {
        updateData.imageUrl = req.file.path;
      }

      if (price) updateData.price = Number(price);
      if (stock) updateData.stock = Number(stock);

      const updatedProduct = await productService.updateProduct(id, updateData);

      return res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        data: updatedProduct
      });
    } catch (error: any) {
      console.error("Update product error:", error);
      return res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm' });
    }
  };

  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await productService.deleteProduct(Number(id));
      res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error: any) {
      console.error("Delete product error:", error);
      res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
    }
  }
}