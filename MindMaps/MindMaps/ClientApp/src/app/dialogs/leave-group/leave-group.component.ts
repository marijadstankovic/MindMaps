import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoomService } from '../../_services/room.service';
import { SnackBarService } from '../../_services/snack-bar.service';

@Component({
  selector: 'app-leave-group',
  templateUrl: './leave-group.component.html',
  styleUrls: ['./leave-group.component.css']
})
export class LeaveGroupComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<LeaveGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public room: any) { }

  UserUid: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  ngOnInit() {
  }

  leaveGroup() {
    const user = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    this.UserUid = +this.decodedToken.nameid;

    this.roomService.leave(this.room.id, this.UserUid).subscribe(res => {
      this.snackBarService.openSnackBar("The group is leaved.", "OK");
    });
  }
}
