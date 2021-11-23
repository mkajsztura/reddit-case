import { Component, Input } from '@angular/core';
import { Subreddit } from '../../subreddit.model';

@Component({
  selector: 'app-subreddit-list-item',
  templateUrl: './subreddit-list-item.component.html',
  styleUrls: ['./subreddit-list-item.component.scss'],
})
export class SubredditListItemComponent {
  @Input() subreddit!: Subreddit;
}
