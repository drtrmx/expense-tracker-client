import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseListComponent } from "../expense-list/expense-list.component";
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseDetailComponent } from "../expense-detail/expense-detail.component";
import { ExpenseEditorComponent } from '../expense-editor/expense-editor.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { IndexPageComponent } from '../index-page/index-page.component';
import { AuthenticateGuard } from '../authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent
  },
  {
    path: 'expenses',
    component: ExpenseListComponent,

  },
  {
    path: 'expenses/add',
    component: ExpenseFormComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'expenses/:id',
    component: ExpenseDetailComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'expenses/:id/edit',
    component: ExpenseEditorComponent,
    canActivate: [AuthenticateGuard],
    data: {
      roles: ['ROLE_OWNER']
    }
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }