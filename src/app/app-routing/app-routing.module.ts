import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchBarComponent} from "../search/search-bar/search-bar.component";

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchBarComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
