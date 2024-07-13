import { IProduct } from './product.interface';
import { Product } from './product.model';

const saveIntoDB = async (payload: IProduct) => {
  return await Product.create(payload);
};

const getAllFromDB = async () => {
  return await Product.find({});
};

export const ProductServices = {
  saveIntoDB,
  getAllFromDB,
};
