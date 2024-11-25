export interface IPaginatedResponse<T> {
  success: boolean;
  data: {
    tables: T[];
    total: number;
    page: number;
    totalPages: number;
  };
}
