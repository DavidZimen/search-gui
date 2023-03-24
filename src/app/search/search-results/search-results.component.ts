import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResult} from "../../dto/search-result";
import {Subscription} from "rxjs";
import {SearchService} from "../../service/search.service";
import {FilterService} from "../../service/filter.service";
import {Filter} from "../../filter/filter";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  searchResults: SearchResult[];
  filter: Filter = new Filter([]);
  querySubscription: Subscription;
  filterSubscription: Subscription;

  constructor(
    private searchService: SearchService,
    private filterService: FilterService
  ) {

  }

  ngOnInit(): void {
    this.establishQuerySubscription();
    this.establishFilterSubscription();
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  establishQuerySubscription(): void {
    this.querySubscription = this.searchService.query.subscribe(
      {next: query => {
          if (query !== null) {
            this.search(query);
          }
        }}
    )
  }

  establishFilterSubscription() : void {
    this.filterSubscription = this.filterService.filter.subscribe({
      next: filter => this.filter = filter
    });
  }

  search(query: string): void {
    this.searchService.search(query)
      .toPromise()
      .then(results => {
        this.searchResults = results;
        const resultTypesSet = new Set<string>(results.map(res => res.resultType));

        if (resultTypesSet.size > 1) {
          this.filterService.filterEnabled.next(true);
          this.filterService.filterResultTypes.next(Array.from(resultTypesSet));
        } else {
          this.filterService.filterEnabled.next(false);
          this.filterService.filterResultTypes.next([]);
        }
      });
  }
}
