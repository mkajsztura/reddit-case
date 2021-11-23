import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DataCollection, DataPagination } from '../core/pagination/data.model';
import { Subreddit } from './subreddit.model';
import { map, retry } from 'rxjs';
import { PaginationParams } from '../core/pagination/pagination-params.model';
import { paramsToQuery } from '../core/pagination/query-param.utils';

@Injectable({
  providedIn: 'root',
})
export class SubredditHttpService {
  private readonly baseUrl = 'https://www.reddit.com/r';

  constructor(private http: HttpClient) {}

  getCollection(
    params: PaginationParams
  ): Observable<DataPagination<Subreddit>> {
    // when there is after or before api response has one item less
    if (params.limit && !params.after && !params.before) {
      params = {
        ...params,
        limit: params.limit - 1,
      };
    }
    const httpParams = paramsToQuery(params);

    return this.http
      .get<DataCollection<Subreddit>>(`${this.baseUrl}/sweden.json`, {
        params: httpParams,
      })
      .pipe(
        retry(2), // sometimes it fails for the first time
        map((collection) => collection.data)
      );
  }
}
