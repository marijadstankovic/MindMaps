import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../_services/room.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { error } from '@angular/compiler/src/util';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css']
})
export class FormRoomComponent implements OnInit {
  roomModel: any = {};
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

  add() {
    const user = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    this.roomModel.UserUid = +this.decodedToken.nameid;
    // 
    this.roomService.add(this.roomModel).subscribe(() => {
      console.log('Create room');
    }, error => {
        console.log(error);
    });
  }
}


