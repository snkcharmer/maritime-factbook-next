import { IDefaultAPI } from './Others.type';

export interface IFbTableData extends IDefaultAPI {
  userId: string;
  name: string;
  chartType: string;
  source: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
