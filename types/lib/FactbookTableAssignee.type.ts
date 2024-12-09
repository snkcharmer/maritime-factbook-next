import { IFbTable } from './FactbookTable.type';
import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';
import { IUser } from './User.type';

export interface IFbTableAssignee extends IDefaultAPI {
  userId: string[];
  fbTableId: string;
  user?: IUser;
  fbTable?: IFbTable;
}

export type TFbTableAssigneeResponse = IPaginatedResponse<IFbTableAssignee>;
