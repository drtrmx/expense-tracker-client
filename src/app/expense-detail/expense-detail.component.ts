import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  async ngOnInit() {
    const id = await this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = await +id;
      this.expense = await this.expenseService.getExpense(this.id);
    }
  }
}