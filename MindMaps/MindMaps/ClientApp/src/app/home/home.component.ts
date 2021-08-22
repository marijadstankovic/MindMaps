import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public authService: AuthService) {
  }
  loggedin() {
    return this.authService.loggedin();
  }
}
