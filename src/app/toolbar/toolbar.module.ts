import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {SearchModule} from "../search/search.module";
import {TranslateModule} from "@ngx-translate/core";
import {FilterModule} from "../filter/filter.module";



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    TranslateModule,
    FilterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
