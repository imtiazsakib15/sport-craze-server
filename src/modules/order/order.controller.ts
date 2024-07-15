import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderServices } from './order.service';
import { Request, Response } from 'express';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { order } = req.body;
  const result = await OrderServices.saveIntoDB(order);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderControllers = { createOrder };
