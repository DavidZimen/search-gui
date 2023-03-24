import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Filter} from "../filter/filter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(new Filter([]));
  filterEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  filterResultTypes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }
}
