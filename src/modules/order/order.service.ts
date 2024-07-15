import mongoose from 'mongoose';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const saveIntoDB = async (payload: IOrder) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [result] = await Order.create([payload], { session });

    await Promise.all(
      result?.orderInfo?.map(async (order) => {
        const product = await Product.findOne({ _id: order.productId });
        if (!product)
          throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

        if (product.quantity < order.quantity)
          throw new AppError(httpStatus.BAD_REQUEST, 'Unsufficient product');

        await Product.updateOne(
          { _id: order.productId },
          { quantity: product.quantity - order.quantity },
          { session },
        );
      }),
    );
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderServices = { saveIntoDB };
