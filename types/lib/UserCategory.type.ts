import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';

export interface IUserCategory extends IDefaultAPI {
  name: string;
  description?: string;
}

export type TUserCategoryResponse = IPaginatedResponse<IUserCategory>;
