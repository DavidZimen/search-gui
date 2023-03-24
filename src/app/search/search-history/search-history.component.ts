import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHistoryService} from "../../service/search-history.service";
import {SearchHistoryItem} from "../../dto/search-history-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {

  searchHistoryItems: SearchHistoryItem[] = []
  searchHistorySubscription: Subscription;

  constructor(private searchHistoryService: SearchHistoryService) { }

  ngOnInit(): void {
    this.subscribeToSearchHistory();
  }

  ngOnDestroy(): void {
    this.searchHistorySubscription.unsubscribe();
  }

  private subscribeToSearchHistory(): void {
    this.searchHistoryService.loadSearchHistoryItems();
    this.searchHistorySubscription = this.searchHistoryService.searchHistoryItems$.subscribe({
      next: items => this.searchHistoryItems = items
    })
  }
}
