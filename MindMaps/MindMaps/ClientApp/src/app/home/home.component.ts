import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../_services/auth.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userModel: any = {};
  user: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(public authService: AuthService, public profileService: ProfileService) {
  }

  ngOnInit() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.userModel.UserUid = +this.decodedToken.nameid;

    this.profileService.getUser(this.userModel.UserUid)
      .subscribe(res => {
        this.user = res;
      });
  }

  loggedin() {
    return this.authService.loggedin();
  }
}
