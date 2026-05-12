import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (validatedData.body) req.body = validatedData.body;
      if (validatedData.query) Object.assign(req.query, validatedData.query);
      if (validatedData.params) Object.assign(req.params, validatedData.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation Error:', JSON.stringify(error.issues, null, 2));
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }));

        res.status(400).json({
          success: false,
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: formattedErrors
        });
        return;
      }

      next(error);
    }
  };
};