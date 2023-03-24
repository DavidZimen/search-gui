import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {SearchResult} from "../dto/search-result";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl: string = 'search';

  query: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient
  ) { }

  public search(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.searchUrl, {
      params: { query: query }
    })
  }
}
