import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';
import { IFbCategory } from './FactbookCategory.type';

export interface IFbSubCategory extends IDefaultAPI {
  fbCategory?: IFbCategory;
  name: string;
}

export interface IFbSubCategoryByCategoryResponse {
  fbCategoryId: string;
  data: IFbSubCategory[];
}

export type TFbSubCategoryResponse = IPaginatedResponse<IFbSubCategory>;
