export interface ILoadingState {
  isLoading: boolean;
}

export interface IPagination {
  page: number;
  totalPages: number;
}

export interface IDataState<T> extends ILoadingState {
  data: T[];
  pagination: IPagination;
}
