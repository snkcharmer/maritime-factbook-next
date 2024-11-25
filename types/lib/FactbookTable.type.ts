import { CategoryEnum, ChartTypeEnum } from '@/context/enum';
import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';
import { IUser } from './User.type';

export interface IFbTable extends IDefaultAPI {
  userId: string;
  category: CategoryEnum | null;
  name: string;
  chartType: ChartTypeEnum | null;
  source: string;
  user?: IUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export type TFbTableResponse = IPaginatedResponse<IFbTable>;
