export enum PageSortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IPageSort {
  property: string;
  direction?: PageSortDirectionEnum;
}

export interface ISort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
