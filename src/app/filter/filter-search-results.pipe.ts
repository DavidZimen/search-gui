import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {SearchResult} from "../dto/search-result";
import {Filter} from "./filter";

@Pipe({
  name: 'filterResults'
})
@Injectable()
export class FilterSearchResultsPipe implements PipeTransform {

  transform(items: SearchResult[], value: Filter): SearchResult[] {
    if (value.filterResultType.length === 0) {
      return items;
    }
    return items.filter(item => value.filterResultType.includes(item.resultType));
  }

}
