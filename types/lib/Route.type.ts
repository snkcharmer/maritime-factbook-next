import { ADMIN_ROUTES, ROUTES } from '@/constants';

export interface TRouteParams {
  fbTable: { dynamicParams: { fbTableSlug: string } };
  fbCategoryTable: {
    dynamicParams: { fbCategorySlug: string; fbTableSlug: string };
  };
}

export type TRoute = {
  path: `${typeof ROUTES.assignedTables}`;
  dynamicParams: TRouteParams['fbTable']['dynamicParams'];
};

export type TAdminRoute =
  | {
      path: `${typeof ADMIN_ROUTES.resourceCategories}`;
      dynamicParams: { fbCategorySlug: string };
    }
  | {
      path: `${typeof ADMIN_ROUTES.resourceCategoriesTable}`;
      dynamicParams: TRouteParams['fbCategoryTable']['dynamicParams'];
    };
