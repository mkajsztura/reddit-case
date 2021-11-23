import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubredditDetailsComponent } from './components/subreddit-details/subreddit-details.component';
import { SubredditListComponent } from './components/subreddit-list/subreddit-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subreddits',
    pathMatch: 'full',
  },
  {
    path: 'subreddits',
    children: [
      {
        path: '',
        component: SubredditListComponent,
      },
      {
        path: ':id',
        component: SubredditDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubRedditRoutingModule {}
