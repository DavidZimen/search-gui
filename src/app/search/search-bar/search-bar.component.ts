import { Component, OnInit } from '@angular/core';
import {SearchResult} from "../../dto/search-result";
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchResults: SearchResult[] = [];
  query: string;
  resultTypes: string[] = [];
  filterEnabled: boolean = false;

  constructor(
    private searchService: SearchService
  ) {

  }

  ngOnInit(): void {
  }

  public async search() {
    this.searchService.search(this.query)
      .toPromise()
      .then(results => {
        this.searchResults = results;
        const resultTypesSet = new Set<string>(results.map(res => res.resultType));

        if (resultTypesSet.size > 1) {
          this.enableFilter(true, resultTypesSet);
        }
      });
  }

  private enableFilter(enable: boolean, resultTypesSet?: Set<string>): void {
    if (enable) {
      this.resultTypes = Array.from(resultTypesSet!);
      this.filterEnabled = true;
    } else {
      this.filterEnabled = false;
    }
  }

}
