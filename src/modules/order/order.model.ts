import { model, Schema } from 'mongoose';
import { IOrder, IOrderInfo } from './order.interface';

const orderInfoSchema = new Schema<IOrderInfo>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product id is required'],
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
    },
    phoneNo: {
      type: String,
      required: [true, 'Customer phone no is required'],
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Customer delivery address is required'],
    },
    orderInfo: { type: [orderInfoSchema], required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
