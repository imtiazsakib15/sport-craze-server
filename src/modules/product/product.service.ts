import QueryBuilder from '../../builder/QueryBuilder';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const saveIntoDB = async (payload: IProduct) => {
  return await Product.create(payload);
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const searchableFields: string[] = ['name', 'category', 'brand'];
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();
  return await productQuery.modelQuery;
};

const getByIdFromDB = async (id: string) => {
  return await Product.findOne({ _id: id });
};

const updateIntoDB = async (id: string, payload: IProduct) => {
  return await Product.updateOne({ _id: id }, payload, { new: true });
};

const deleteFromDB = async (id: string) => {
  return await Product.deleteOne({ _id: id });
};

export const ProductServices = {
  saveIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
