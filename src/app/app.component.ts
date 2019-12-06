 
import { Component } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-tracker-client';

  constructor (
    private authService: AuthenticateService,
    private router: Router
  ) {
    console.log(authService.user)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
