import { DEFAULT_LIMIT } from './params.const';

export type QueryParams = Record<string, string | number | boolean>;

export interface PaginationParams extends QueryParams {
  limit: number;
  after: string;
  before: string;
  count: number;
}

export function createPaginationParams(
  partial?: Partial<PaginationParams>
): PaginationParams {
  return {
    after: '',
    before: '',
    count: 0,
    limit: DEFAULT_LIMIT,
    ...partial,
  };
}
