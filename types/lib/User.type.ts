import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';

export interface IUser extends IDefaultAPI {
  name: string;
  email: string;
  role: string;
}

export type TUserResponse = IPaginatedResponse<IUser>;
