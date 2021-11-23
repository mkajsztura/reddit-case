import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubRedditRoutingModule } from './subreddit-routing.module';
import { SubredditListComponent } from './components/subreddit-list/subreddit-list.component';
import { SubredditDetailsComponent } from './components/subreddit-details/subreddit-details.component';
import { SubredditListItemComponent } from './components/subreddit-list-item/subreddit-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SubredditListComponent,
    SubredditDetailsComponent,
    SubredditListItemComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, SubRedditRoutingModule],
})
export class SubredditModule {}
