import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SearchResultsComponent} from "../search/search-results/search-results.component";
import {SearchHistoryComponent} from "../search/search-history/search-history.component";

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchResultsComponent },
  { path: 'search-history', component: SearchHistoryComponent }
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
