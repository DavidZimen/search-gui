import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FilterModule} from "../filter/filter.module";
import {TableModule} from "primeng/table";
import { SearchHistoryComponent } from './search-history/search-history.component';
import {ErrorPagesModule} from "../error-pages/error-pages.module";



@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultsComponent,
    SearchHistoryComponent
  ],
    imports: [
        CommonModule,
        InputTextModule,
        FormsModule,
        TranslateModule,
        ButtonModule,
        CardModule,
        FilterModule,
        TableModule,
        ErrorPagesModule
    ],
  exports: [
    SearchBarComponent,
    SearchResultsComponent
  ]
})
export class SearchModule { }
