import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ListRoomService {
  baseUrl = "https://localhost:5001/api/";
    decodedToken: any;
    userModel: any = {};
    jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  getRooms() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.userModel.UserUid = +this.decodedToken.nameid;
    console.log("Token: " + this.decodedToken);

    this.http.get(this.baseUrl + "Rooms/" + this.userModel.UserUid)
      .subscribe(res => {
        //this.user = res;
        //this.editUser = res;
       // console.log(this.user);
      });
  }
}
