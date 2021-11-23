export interface DataCollection<T> {
  kind: string;
  data: DataPagination<T>;
}

export interface DataPagination<T> {
  after: string;
  before: string | null;
  dist: number;
  children: Data<T>[];
}

export interface Data<T> {
  kind: string;
  data: T;
}
