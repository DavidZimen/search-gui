import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filterOptions: string[];

  dropdownOptions: string[] = [];
  tableOptions: string[] = [];

  display: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.dropdownOptions = [...this.filterOptions];
  }

  moveToChip(value: string): void {
    this.tableOptions.push(value);
    this.dropdownOptions.splice(this.dropdownOptions.findIndex(option => option === value), 1);
  }

  moveToDropdown(value: string): void {
    this.dropdownOptions.push(value);
    this.tableOptions.splice(this.tableOptions.findIndex(option => option === value), 1);
  }
}
