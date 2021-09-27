import { Component, Inject, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../../_services/profile.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from '../../_services/snack-bar.service';

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

  editHidden: boolean;
  editUser: any;

  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<FormProfileComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public isEdit: boolean) {
    this.editHidden = !isEdit;
  }

  ngOnInit() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.userModel.UserUid = +this.decodedToken.nameid;
   
    this.profileService.getUser(this.userModel.UserUid)
      .subscribe(res => {
        this.user = res;
        this.editUser = res;
      });
  }

  edit() {
    this.snackBarService.openSnackBar("Edit profile", "OK");

    this.editHidden = !this.editHidden;
    return this.editHidden;
  }

  cancal() {
    this.dialogRef.close();

    this.snackBarService.openSnackBar("No change", "OK");
  }

  save() {
    this.profileService.updateUser(this.userModel.UserUid, this.editUser)
      .subscribe(res => {
        console.log("Sacuvane su promene usera!!!");
      });
    //popup bi bio pozeljan
    this.snackBarService.openSnackBar("Save change!", "OK");
    
    this.dialogRef.close();
  }
}


