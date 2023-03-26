import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoSearchResultsFoundComponent } from './no-search-results-found/no-search-results-found.component';



@NgModule({
  declarations: [
    NoSearchResultsFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoSearchResultsFoundComponent
  ]
})
export class ErrorPagesModule { }
