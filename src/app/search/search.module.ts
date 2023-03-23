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



@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    FilterModule
  ],
  exports: [
    SearchBarComponent,
    SearchResultsComponent
  ]
})
export class SearchModule { }
