import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {SearchHistoryItem} from "../dto/search-history-item";
import {take} from "rxjs/operators";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private searchHistoryUrl: string = 'search-history';

  private searchHistoryItems = new Subject<SearchHistoryItem[]>();
  searchHistoryItems$ = this.searchHistoryItems.asObservable();
  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  public loadSearchHistoryItems(): void {
    this.loadSearchHistory()
      .pipe(take(1))
      .subscribe({
        next: items => this.searchHistoryItems.next(items),
        error: (error: HttpErrorResponse) => this.messageService.showErrorMessageLocalized(error.name, error.message),
        complete: () => {}
      })
  }

  private loadSearchHistory(): Observable<SearchHistoryItem[]> {
    return this.http.get<SearchHistoryItem[]>(this.searchHistoryUrl);
  }
}
