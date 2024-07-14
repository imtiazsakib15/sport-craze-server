import { IProduct } from './product.interface';
import { Product } from './product.model';

const saveIntoDB = async (payload: IProduct) => {
  return await Product.create(payload);
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const queryCopy: Record<string, unknown> = { ...query };
  let searchTerm: string = '';
  if (query?.searchTerm) searchTerm = query.searchTerm as string;

  const searchableFields: string[] = ['name'];
  const searchQuery = Product.find({
    $or: searchableFields.map((field) => ({
      [field]: new RegExp(searchTerm, 'i'),
    })),
  });

  const excludeFields: string[] = ['searchTerm'];
  excludeFields.map((field) => delete queryCopy[field]);

  const filterQuery = searchQuery.find(queryCopy);

  return await filterQuery.find({});
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
