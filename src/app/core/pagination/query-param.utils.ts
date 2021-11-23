import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import {
  createPaginationParams,
  PaginationParams,
  QueryParams,
} from './pagination-params.model';

export function paramsToQuery(params: PaginationParams): HttpParams {
  let httpParams = new HttpParams();
  Object.keys(params).forEach((key: string) => {
    if (params[key]) {
      httpParams = httpParams.append(key, params[key]);
    }
  });

  return httpParams;
}

export function queryToParams(
  params: PaginationParams,
  query: Params
): PaginationParams {
  const queryData: Partial<PaginationParams> = Object.keys(query).reduce(
    (result: Partial<PaginationParams>, currentKey: string) => {
      if (params.hasOwnProperty(currentKey)) {
        result[currentKey] = query[currentKey];
      }
      return result;
    },
    {}
  );

  return createPaginationParams(queryData);
}

export function getParamsWithValue(params: QueryParams): QueryParams {
  return Object.keys(params).reduce((paramsWithValue: QueryParams, current) => {
    if (params[current]) {
      paramsWithValue[current] = params[current];
    }
    return paramsWithValue;
  }, {});
}
