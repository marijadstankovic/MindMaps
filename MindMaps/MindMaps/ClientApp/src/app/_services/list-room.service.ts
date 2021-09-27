import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ListRoomService {
  baseUrl = "https://localhost:5001/api/";
    decodedToken: any;
    userModel: any = {};
    jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient,private snackBarService: SnackBarService) { }

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

  getChats() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.userModel.UserUid = +this.decodedToken.nameid;
    return this.http.get(this.baseUrl + "Chats/GetChatsForLoggedUser?uid=" + this.userModel.UserUid);
    // .subscribe(res => {
    //   console.log(res);
    // });
  }

  updateRoomName(roomID: number, name: string) {
    return this.http.put(this.baseUrl + "RoomName/" + roomID, name).subscribe(res => {
      this.snackBarService.openSnackBar("Room's name is changed.", "OK");
    });
  }
}
