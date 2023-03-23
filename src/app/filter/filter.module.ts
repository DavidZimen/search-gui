import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterComponent} from "./filter/filter.component";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {DropdownModule} from "primeng/dropdown";
import {ChipModule} from "primeng/chip";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    ChipModule,
    TranslateModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
