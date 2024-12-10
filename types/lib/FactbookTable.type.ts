import { IDefaultAPI } from './Others.type';
import { IPaginatedResponse } from './Pagination.type';
import { IUser } from './User.type';
import { IFbCategory } from './FactbookCategory.type';
import { TChartType } from '@/components/admin/dashboard/resource-categories/DynamicChart';

export interface IFbTable extends IDefaultAPI {
  userId: string;
  fbCategoryId: string | null;
  name: string;
  slug: string;
  // chartType: ChartTypesEnum | null;
  chartType: TChartType | null;
  source: string;
  data: any;
  user?: IUser;
  fbCategory?: IFbCategory;
}

export type TFbTableResponse = IPaginatedResponse<IFbTable>;
