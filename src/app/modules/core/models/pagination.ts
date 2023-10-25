export interface Pagination<T> {
  [x: string]: any;
  data: T[];
  totalCount: number;
  countInPage: number;
  page: number;
  pageSize: number;
}
