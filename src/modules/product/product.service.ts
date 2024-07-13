import { IProduct } from './product.interface';
import { Product } from './product.model';

const saveIntoDB = async (payload: IProduct) => {
  return await Product.create(payload);
};

const getAllFromDB = async () => {
  return await Product.find({});
};

const getByIdFromDB = async (id: string) => {
  return await Product.findOne({ _id: id });
};

const updateIntoDB = async (id: string, payload: IProduct) => {
  return await Product.updateOne({ _id: id }, payload, { new: true });
};

export const ProductServices = {
  saveIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
};
