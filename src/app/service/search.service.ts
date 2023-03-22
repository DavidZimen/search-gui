import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResult} from "../dto/search-result";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl: string = 'search';
  constructor(
    private http: HttpClient
  ) { }

  public search(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.searchUrl, {
      params: { query: query }
    })
  }
}
