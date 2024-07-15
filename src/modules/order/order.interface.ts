import { Types } from 'mongoose';

export interface IOrderInfo {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  name: string;
  email: string;
  phoneNo: string;
  deliveryAddress: string;
  orderInfo: IOrderInfo[];
}
