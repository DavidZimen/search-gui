import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-serch-results-found',
  templateUrl: './no-search-results-found.component.html',
  styleUrls: ['./no-search-results-found.component.css']
})
export class NoSearchResultsFoundComponent implements OnInit {

  @Input()
  query: string;

  constructor() { }

  ngOnInit(): void {
  }

}
