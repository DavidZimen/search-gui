import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  query: string;
  lastQuery: string;

  constructor(
    private searchService: SearchService
  ) {

  }

  ngOnInit(): void {
  }

  search(): void {
    // if null or undefined return
    if (!this.query) {
      return;
    }

    // if nothing changed dont do anything
    if (this.query === this.lastQuery) {
      return;
    }

    this.searchService.query.next(this.query);
    this.lastQuery = this.query;

  }

}
