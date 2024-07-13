import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { ProductServices } from './product.service';
import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { product } = req.body;
  const result = await ProductServices.saveIntoDB(product);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

export const ProductControllers = { createProduct };
