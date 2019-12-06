import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = []
  filteredExpenses = [];
  minVal = 0;
  selectedExpense = null;

  constructor(
    private expenseService: ExpenseService
  ) { }

  async ngOnInit() {
    this.expenses = await this.expenseService.getExpenses();
    this.filterExpenses();
  }

  filterExpenses() {
    this.filteredExpenses = this.minVal === 0
      ? this.expenses
      : this.expenses.filter(expense => expense.value > this.minVal);
  }

  onFilterChange(data) {
    this.minVal = data;
    this.filterExpenses();
  }

}