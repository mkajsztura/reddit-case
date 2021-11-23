import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subreddit-details',
  templateUrl: './subreddit-details.component.html',
  styleUrls: ['./subreddit-details.component.scss'],
})
export class SubredditDetailsComponent implements OnInit {
  text = '';
  title = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const { selftext, title } = history.state;

    if (!selftext) {
      this.router.navigate(['']);
    }

    this.text = selftext;
    this.title = title;
  }
}
