import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'value-filter',
  templateUrl: './value-filter.component.html',
  styleUrls: ['./value-filter.component.css']
})
export class ValueFilterComponent implements OnInit {

  @Input('value') selectedValue = 0;
  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onFilterChange(data) {
    this.selectedValue = data.value;
    this.change.emit(this.selectedValue);
  }

}