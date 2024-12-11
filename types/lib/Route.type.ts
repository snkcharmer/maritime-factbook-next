import { ADMIN_ROUTES, ROUTES } from '@/constants';

export interface TRouteParams {
  fbTable: { dynamicParams: { fbTableSlug: string } };
  assignedTablesView: { dynamicParams: { fbTableSlug: string } };
  fbCategoryTable: {
    dynamicParams: { fbCategorySlug: string; fbTableSlug: string };
  };
  resourceCategoriesHome: {
    dynamicParams: { fbCategorySlug: string };
  };
  fbTableHome: {
    dynamicParams: { fbTableSlug: string };
  };
}

export type TRoute =
  | {
      path: `${typeof ROUTES.assignedTables}`;
      dynamicParams: TRouteParams['fbTable']['dynamicParams'];
    }
  | {
      path: `${typeof ROUTES.assignedTablesView}`;
      dynamicParams: TRouteParams['assignedTablesView']['dynamicParams'];
    }
  | {
      path: `${typeof ROUTES.resourceCategoriesHome}`;
      dynamicParams: TRouteParams['resourceCategoriesHome']['dynamicParams'];
    }
  | {
      path: `${typeof ROUTES.fbTableHome}`;
      dynamicParams: { fbCategorySlug: string; fbTableSlug: string };
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
