import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';

@Component({
  selector: 'expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  id: number;
  expense: Expense;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.expense = await this.expenseService.getExpense(this.id);
    }
  }
}