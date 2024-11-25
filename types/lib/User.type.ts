import { IDefaultAPI } from './Others.type';

export interface IUser extends IDefaultAPI {
  name: string;
  email: string;
  role: string;
}
