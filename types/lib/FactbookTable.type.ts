import { IDefaultAPI } from "./Others.type";
import { IPaginatedResponse } from "./Pagination.type";
import { IUser } from "./User.type";
import { IFbCategory } from "./FactbookCategory.type";
import { TChartType } from "@/components/admin/dashboard/resource-categories/DynamicChart";
import { StatusEnum } from "@/context/enum";

export interface IFbTable extends IDefaultAPI {
  userId: string;
  fbCategoryId: string | null;
  name: string;
  slug: string;
  note: string;
  // chartType: ChartTypesEnum | null;
  chartType: TChartType | null;
  source: string;
  data: any;
  user?: IUser;
  fbCategory?: IFbCategory;
  status: StatusEnum;
}

export type TFbTableResponse = IPaginatedResponse<IFbTable>;
