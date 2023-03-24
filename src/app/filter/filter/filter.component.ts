import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FilterService} from "../../service/filter.service";
import {MessagesService} from "../../service/messages.service";
import {Filter} from "../filter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  filter: Filter = new Filter([])
  filterOptions: string[];
  chips: string[] = [];
  display: boolean = false;
  filterEnabled: boolean = false;
  enablingFilterSubscription: Subscription;
  optionsSubscription: Subscription;
  filterSubscription: Subscription;
  selectedValue?: string  = undefined;
  clearBtnDisabled: boolean = true;

  constructor(
    private filterService: FilterService,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.establishSubscriptions();
  }

  ngOnDestroy(): void {
    this.enablingFilterSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
  }

  moveToChip(event: any): void {
    this.chips.push(event.value);
    this.filterOptions.splice(this.filterOptions.findIndex(option => option === event.value), 1);
    this.selectedValue = '';
    this.evaluateBtnDisabled();
  }

  moveToDropdown(value: string): void {
    this.filterOptions.push(value);
    this.chips.splice(this.chips.findIndex(option => option === value), 1);
    this.selectedValue = '';
    this.evaluateBtnDisabled();
  }

  establishSubscriptions(): void {
    this.optionsSubscription = this.filterService.filterResultTypes.subscribe({
        next: resultTypes => {
          this.filterOptions = resultTypes;
          this.filterOptions.sort();
          this.chips = [];
        },
        error: err => this.messageService.showErrorMessageLocalized("Problem loading types for filter."),
        complete: () => {}
      }
    );

    this.enablingFilterSubscription = this.filterService.filterEnabled.subscribe({
      next: enabled => this.filterEnabled = enabled,
      error: err => this.messageService.showErrorMessageLocalized("Problem enabling filter."),
      complete: () => {}
    });

    this.filterSubscription = this.filterService.filter.subscribe({
      next: filter => this.filter = filter,
      error: err => this.messageService.showErrorMessageLocalized("Problem loading filter."),
      complete: () => {}
    })
  }

  evaluateBtnDisabled(): void {
    this.chips.length > 0 ? this.clearBtnDisabled = false : this.clearBtnDisabled = true;
  }

  applyFilter(): void {
    let filter = new Filter(this.chips);
    this.filterService.filter.next(filter);
    this.display = false;
  }

  resetAll(): void {
    this.filterOptions = this.filterOptions.concat(this.chips);
    this.filterOptions.sort();
    this.chips = [];
  }
}
