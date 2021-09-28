import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@aspnet/signalr';
import { RoomService } from '../../_services/room.service';
import { SnackBarService } from '../../_services/snack-bar.service';

@Component({
  selector: 'app-room-details-dialog',
  templateUrl: './room-details-dialog.component.html',
  styleUrls: ['./room-details-dialog.component.css']
})
export class RoomDetailsDialogComponent implements OnInit {
  showBtns: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RoomDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public room: any) { }

  ngOnInit() {
    console.log(this.room);
  }

}
