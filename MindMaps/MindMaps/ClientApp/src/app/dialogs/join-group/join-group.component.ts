import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatHubService } from '../../_services/chat-hub.service';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {

  joinRoomModel: any = {};
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private roomService: RoomService, private chatHubService: ChatHubService) { }

  ngOnInit() {
  }

  join() {
    const user = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    this.joinRoomModel.UserUid = +this.decodedToken.nameid;
    // 
    this.roomService.join(this.joinRoomModel).subscribe((roomUser: any) => {
      console.log('Joined room');
      this.chatHubService.addToGroup(roomUser.roomID);
    }, error => {
      console.log(error);
    });
  }


}




