import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from "./filter/filter.component";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {DropdownModule} from "primeng/dropdown";
import {ChipModule} from "primeng/chip";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import { FilterSearchResultsPipe } from './filter-search-results.pipe';



@NgModule({
  declarations: [
    FilterComponent,
    FilterSearchResultsPipe
  ],
    imports: [
        CommonModule,
        ButtonModule,
        SidebarModule,
        DropdownModule,
        ChipModule,
        TranslateModule,
        FormsModule
    ],
    exports: [
        FilterComponent,
        FilterSearchResultsPipe
    ]
})
export class FilterModule { }
