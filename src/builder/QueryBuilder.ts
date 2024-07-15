import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this.query?.searchTerm) {
      const searchTerm: string = this.query.searchTerm as string;
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field: string) => ({
          [field]: new RegExp(searchTerm, 'i'),
        })),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryCopy: Record<string, unknown> = { ...this.query };
    const excludeFields: string[] = [
      'searchTerm',
      'sort',
      'page',
      'limit',
      'fields',
    ];
    excludeFields.map((field: string) => delete queryCopy[field]);
    this.modelQuery = this.modelQuery.find(queryCopy);
    return this;
  }

  sort() {
    const sort: string =
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  pagination() {
    const page: number = Number(this.query?.page);
    const limit: number = Number(this.query?.limit);
    if (page && limit) {
      const skip: number = (page - 1) * limit;
      this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    }
    return this;
  }

  fieldLimiting() {
    const fields: string = (this.query?.fields as string)
      ?.split(',')
      ?.join(' ');
    if (fields) this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
