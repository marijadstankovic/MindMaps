import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoomService } from '../../_services/room.service';
import { SnackBarService } from '../../_services/snack-bar.service';
import { LeaveGroupComponent } from '../leave-group/leave-group.component';

@Component({
  selector: 'app-change-room-name',
  templateUrl: './change-room-name.component.html',
  styleUrls: ['./change-room-name.component.css']
})
export class ChangeRoomNameComponent implements OnInit {

  RoomName: string;

  constructor(
    private roomService: RoomService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ChangeRoomNameComponent>,
    @Inject(MAT_DIALOG_DATA) public idRoom: any) { }

  ngOnInit() {
  }

  changeRoomName() {
    this.roomService.changeRoomName(this.idRoom, this.RoomName)
      .subscribe(res => {
        this.snackBarService.openSnackBar("Name was changed.", "OK");
      });
  }

}
