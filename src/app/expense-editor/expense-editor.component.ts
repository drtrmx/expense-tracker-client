import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { Location } from '@angular/common';
import { AuthenticateService } from '../authenticate.service';


@Component({
  selector: 'expense-editor',
  templateUrl: './expense-editor.component.html',
  styleUrls: ['./expense-editor.component.css']
})
export class ExpenseEditorComponent implements OnInit {

  expense: Expense = new Expense();
  id: number = null;
  title = 'New expense';

  //@Input() expense: Expense;
  @Input() mode: 'edit';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private location: Location,
    private router: Router,
    private authService: AuthenticateService
    
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.expense = await this.expenseService.getExpense(this.id);
      this.title = 'Edit expense';
    }
  }

  async onFormSubmit(expense: Expense) {
    if (this.id) {
      await this.expenseService.modifyExpense(this.id, expense)
      this.location.back();
    } else {
      await this.expenseService.addExpense(expense);
      this.router.navigate(['/expenses']);
    }
  }

}