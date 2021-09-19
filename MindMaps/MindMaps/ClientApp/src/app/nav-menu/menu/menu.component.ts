import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormProfileComponent } from '../form-profile/form-profile.component';
// import { ServiceSignalR } from '../../_services/ServiceSignalR';
import { ChatHubService } from 'src/app/_services/chat-hub.service';
import { FormRoomComponent } from '../form-room/form-room.component';
import { JoinGroupComponent } from '../join-group/join-group.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../../_services/profile.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  user: any;

  constructor(public serviceSignalR: ChatHubService, public dialogProfile: MatDialog, private profileService: ProfileService) { }

  ngOnInit() {
    const user = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(user);
    var userId: any = +this.decodedToken.nameid;

    this.profileService.getUser(userId)
      .subscribe(res => {
        this.user = res;
      });
  }

  logout(){
    localStorage.removeItem("token");
    this.serviceSignalR.stopConnection();
  }

  openProfile() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;

    const dialogRef = this.dialogProfile.open(FormProfileComponent, dialogConfig);

    //dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog result');
   // });
  }


}
