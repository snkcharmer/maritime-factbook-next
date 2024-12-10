export const ADMIN_ROUTES = {
  dashboard: '/dashboard',
  dashboardTableMaker: '/dashboard/table-maker',
  get resourceCategories() {
    return `${this.dashboard}/resource-categories/[fbCategorySlug]` as const;
  },
  get resourceCategoriesTable() {
    return `${this.resourceCategories}/[fbTableSlug]` as const;
  },
  get resourceCategoriesManagement() {
    return `${this.dashboard}/management/resource-categories` as const;
  },
  get userAccountsManagement() {
    return `${this.dashboard}/management/user-accounts` as const;
  },
};

export const ROUTES = {
  dashboard: '/dashboard',
  login: '/login',
  registration: '/registration',
  get assignedTables() {
    return `${this.dashboard}/assigned-tables` as const;
  },
  get assignedTablesView() {
    return `${this.assignedTables}/[fbTableSlug]` as const;
  },
  get activityLog() {
    return `${this.dashboard}/activity-log` as const;
  },
};
