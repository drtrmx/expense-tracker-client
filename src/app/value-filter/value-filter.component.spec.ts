import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueFilterComponent } from './value-filter.component';

describe('ValueFilterComponent', () => {
  let component: ValueFilterComponent;
  let fixture: ComponentFixture<ValueFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
