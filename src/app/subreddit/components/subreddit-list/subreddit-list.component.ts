import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import {
  Data,
  DataCollection,
  DataPagination,
} from 'src/app/core/pagination/data.model';
import { DEFAULT_LIMIT } from 'src/app/core/pagination/params.const';
import {
  createPaginationParams,
  PaginationParams,
} from '../../../core/pagination/pagination-params.model';
import { SubredditHttpService } from '../../subreddit-http.service';
import { Subreddit } from '../../subreddit.model';
import {
  getParamsWithValue,
  queryToParams,
} from 'src/app/core/pagination/query-param.utils';

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.scss'],
})
export class SubredditListComponent implements OnInit, OnDestroy {
  paginationList$!: Observable<DataPagination<Subreddit>>;
  limitOptions = [5, 10, 25];
  limit = DEFAULT_LIMIT;
  paginationParams: PaginationParams = createPaginationParams();
  subscription = new Subscription();
  isLoading = false;
  isError = false;

  constructor(
    private subRedditHttp: SubredditHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nextPage(listing: DataPagination<Subreddit>) {
    const { count } = this.paginationParams;
    const before = listing.before;
    this.paginationParams = {
      ...this.paginationParams,
      before: before || '',
      after: '',
      count: count - listing.dist || 5,
    };
    this.refreshData();
  }

  prevPage(listing: DataPagination<Subreddit>) {
    const { count } = this.paginationParams;
    const after = listing.after;
    this.paginationParams = {
      ...this.paginationParams,
      after: after || '',
      before: '',
      count: count + listing.dist,
    };
    this.refreshData();
  }

  changeSize(limit: number) {
    this.paginationParams = {
      ...this.paginationParams,
      before: '',
      limit: limit,
      count: this.paginationParams.count + limit - this.limit,
    };
    this.limit = limit;
    this.refreshData();
  }

  goToItem(item: Subreddit) {
    const { selftext, title } = item;
    this.router.navigate(['subreddits', item.id], {
      state: {
        selftext: selftext || 'No self text in this subreddit.',
        title,
      },
    });
  }

  private readQueryParams() {
    this.subscription = this.route.queryParams
      .pipe(
        tap((params: Params) => {
          this.paginationParams = queryToParams(this.paginationParams, params);
          console.log(
            '🚀 ~ file: subreddit-list.component.ts ~ line 88 ~ SubredditListComponent ~ tap ~ this.paginationParams',
            this.paginationParams
          );
          if (this.paginationParams.limit) {
            this.limit = +this.paginationParams.limit;
          }
        })
      )
      .subscribe(() => this.refreshData());
  }

  private setQueryParamsToUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: getParamsWithValue(this.paginationParams),
      replaceUrl: false,
    });
  }

  private refreshData() {
    this.isLoading = true;
    this.paginationList$ = this.subRedditHttp
      .getCollection(this.paginationParams)
      .pipe(
        // tap((dataPagination) => {
        //   const { dist, before, after } = dataPagination;
        //   const { count } = this.paginationParams;
        //   this.paginationParams = {
        //     ...this.paginationParams,
        //     after,
        //     before: before || '',
        //   };
        // }),
        catchError((error) => {
          this.isError = true;
          throw error;
        }),
        finalize(() => (this.isLoading = false))
      );
  }
}
