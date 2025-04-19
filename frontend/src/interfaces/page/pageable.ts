import { ISort } from './sort';

export interface IPageable {
  sort: ISort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
