import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Expense } from '../expense';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ExpenseService } from '../expense.service';
import { Category } from '../category';
import { Place } from '../place';
import { CategoryService } from '../category.service';
import { PlaceService } from '../place.service';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})

export class ExpenseFormComponent implements OnInit, OnChanges {

  @Input() expense: Expense;
  @Input() showUser = false;
  @Output() save = new EventEmitter<Expense>();

  id?: number;
/*
  title = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  place = new FormControl('', Validators.required);
  description = new FormControl('');
  date = new FormControl('', Validators.required);
*/
  expenseForm = this.fb.group({
    title: ['', [Validators.required]],
    value: ['', [Validators.required]],
    category: ['', [Validators.required]],
    place: ['', [Validators.required]],
    description: ['', []],
    date: ['', [Validators.required]],

  });

  categories: Category[];
  places: Place[];
  currPlace: Place;
  selectedPlace: Place;
  currCat: Category;
  selectedCat: Category;

  inAddNew: boolean;

  get title() { return this.expenseForm.get('title'); }
  get value() { return this.expenseForm.get('value'); }
  get category() { return this.expenseForm.get('category'); }
  get place() { return this.expenseForm.get('place'); }
  get description() { return this.expenseForm.get('description'); }
  get date() { return this.expenseForm.get('date'); }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private authService: AuthenticateService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.inAddNew = this.router.url === '/add';
    console.log(this.router.url);

  }

  async ngOnInit() {
    await this.loadCategories();
    await this.loadPlaces();
  }



  private async loadCategories() {
    this.categories = await this.categoryService.getCategories();
    /*if (this.expense != null) {
      this.currCat = await this.categoryService.getCategory(this.expense.category.id);
      this.selectedCat = await this.categories.find(cat => cat.id == this.currCat.id);
    }*/
  }

  private async loadPlaces() {
    this.places = await this.placeService.getPlaces();
    /*if (this.expense != null) {
      this.currPlace = await this.placeService.getPlace(this.expense.place.id);
      this.selectedPlace = await this.places.find(place => place.id == this.currPlace.id);
    }*/
  }

  ngOnChanges() {
    /*this.title.setValue(this.expense.title);
    this.value.setValue(this.expense.value);
    this.category.setValue(this.expense.category);
    this.place.setValue(this.expense.place);
    this.description.setValue(this.expense.description);
    this.date.setValue(this.expense.date);*/
    this.expenseForm.patchValue(this.expense);
  }

  async onSubmit() {

 

    const result = new Expense();
    result.id = this.id;
    result.title = this.expenseForm.value.title;
    result.value = this.expenseForm.value.value;
    result.category = this.expenseForm.value.category;
    result.place = this.expenseForm.value.place;
    result.description = this.expenseForm.value.description;
    result.date = new Date();
    result.owner = this.authService.user;
    if (!this.id) {
      await this.expenseService.addExpense(result);
    }
    this.save.emit(result);
    this.router.navigate(['/expenses']);
  }

}
