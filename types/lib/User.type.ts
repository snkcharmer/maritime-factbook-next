import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';
import { IUserCategory } from './UserCategory.type';

export interface IUser extends IDefaultAPI {
  name: string;
  email: string;
  password: string;
  role: string;
  categoryId: string;
  category?: IUserCategory;
}

export type TUserResponse = IPaginatedResponse<IUser>;
