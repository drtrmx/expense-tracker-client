import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Expense } from '../expense';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ExpenseService } from '../expense.service';


@Component({
  selector: 'expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})

export class ExpenseFormComponent implements OnInit, OnChanges {

  expenseForm = this.fb.group({
    title: ['', [Validators.required]],
    value: ['', [Validators.required]],
    category: ['', [Validators.required]],
    place: ['', [Validators.required]],
    description: ['', [Validators.required]],
    user: ['', [Validators.required]],
    date: new Date().toLocaleString()
  });
  @Input() expense: Expense;
  @Input() showUser = false;
  @Output() save = new EventEmitter<Expense>();

  get title() { return this.expenseForm.get('title'); }
  get value() { return this.expenseForm.get('value'); }
  get category() { return this.expenseForm.get('category'); }
  get place() { return this.expenseForm.get('place'); }
  get description() { return this.expenseForm.get('description'); }
  get user() { return this.expenseForm.get('user'); }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers();
  }
  ngOnChanges() {
    this.expenseForm.patchValue(this.expense);
  }

  async onSubmit() {

    const routeId = this.route.snapshot.paramMap.get('id');
    this.expenseForm.value.id = routeId;
    this.expenseForm.value.date = new Date();
    const expObj = Object.assign(new Expense(), this.expenseForm.value);
    if (!routeId) await this.expenseService.addExpense(expObj);
    this.save.emit(expObj);
  }

}