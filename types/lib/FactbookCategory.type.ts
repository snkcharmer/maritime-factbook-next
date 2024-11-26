import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';

export interface IFbCategory extends IDefaultAPI {
  name: string;
}

export type TFbCategoryResponse = IPaginatedResponse<IFbCategory>;
