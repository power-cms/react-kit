import { IPagination } from './state';

export interface IRoutedProps {
  match: {
    params: any;
  };
  history: {
    push(path: string): void;
  };
}

export interface IDataProps<T> {
  data: T[];
  isLoading: boolean;
  pagination: IPagination;
  getData(page: number): void;
}

export interface IFormProps {
  handleSubmit: () => void;
  error?: string;
  initialValues?: any;
}
