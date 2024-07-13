import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { ProductServices } from './product.service';
import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';
import AppError from '../../errors/AppError';

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

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getByIdFromDB(id);

  if (result == null)
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product } = req.body;
  const result = await ProductServices.updateIntoDB(id, product);

  if (result.matchedCount === 0)
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
