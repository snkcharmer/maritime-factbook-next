export interface IDefaultAPI {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface ISelectOption {
  label: string;
  value: string;
}
