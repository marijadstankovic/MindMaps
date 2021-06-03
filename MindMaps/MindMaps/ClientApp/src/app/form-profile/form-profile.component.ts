import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../_services/profile.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.css']
})
export class FormProfileComponent implements OnInit {
  userModel: any = {};
  user: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl = "https://localhost:5001/api/";

  editHidden: boolean;
  editUser: any;

  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(private profileService: ProfileService, private http: HttpClient, public dialogRef: MatDialogRef<FormProfileComponent>) { }

  ngOnInit() {
    this.editHidden = true;
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.userModel.UserUid = +this.decodedToken.nameid;
    console.log("Token: "+ this.decodedToken);
   
    this.http.get(this.baseUrl + "Users/" + this.userModel.UserUid)
      .subscribe(res => {
        this.user = res;
        this.editUser = res;
        console.log(this.user);
      });
    

    //this.userModel = this.profileService.getUser(this.userModel.UserUid);
    //console.log("Ngfdgt:" + this.userModel);
    //console.log(this.user);
  }

  edit() {
    //console.log(this.editUser);


    this.editHidden = !this.editHidden;
    return this.editHidden;
  }

  cancal() {
    this.dialogRef.close();
  }

  save() {
    this.http.put<any>(this.baseUrl + "Users/" + this.userModel.UserUid, this.editUser)
      .subscribe(res => {
        console.log("Sacuvane su promene usera!!!");
      });
    //popup bi bio pozeljan

    
    this.cancal();
  }
}


