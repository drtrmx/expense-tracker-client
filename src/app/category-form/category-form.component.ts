import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
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
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() category: Category;
  @Output() save = new EventEmitter<Category>();

  name = new FormControl('name', Validators.required);

  id?: number;

  places: Place[];
  form: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.form = formBuilder.group({
      places: new FormArray([])
    });
    this.form.controls.name = new FormControl();
    this.loadPlaces();

  }


  ngOnInit() {
    this.loadPlaces();
    this.addCheckboxes();
  }
  ngOnChanges() {
    this.name.setValue(this.category.name);
  }

  private async addCheckboxes() {
    await this.loadPlaces();
    this.places.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.form.controls.places as FormArray).push(control);
    });
  }

  private async loadPlaces() {
    this.places = await this.placeService.getPlaces();
  }

  async onSubmit() {
    const result = new Category();
    result.id = this.id;
    result.name = this.name.value;
  
    if (!this.id) {
      await this.categoryService.addCategory(result);
    }
    this.save.emit(result);
  }

}
