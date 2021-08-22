import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormProfileComponent } from '../form-profile/form-profile.component';
// import { ServiceSignalR } from '../../_services/ServiceSignalR';
import { ChatHubService } from 'src/app/_services/chat-hub.service';
import { FormRoomComponent } from '../form-room/form-room.component';
import { JoinGroupComponent } from '../join-group/join-group.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public serviceSignalR: ChatHubService, public dialogProfile: MatDialog, public dialogAddGroup: MatDialog) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
    this.serviceSignalR.stopConnection();
  }

  openAddGroupForm() {
    //this.hideAddGroupForm = false;
    const dialogConfig = new MatDialogConfig();
    this.dialogAddGroup.open(FormRoomComponent, dialogConfig);
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

  joinGroupForm(){
    const dialogConfig = new MatDialogConfig();
    this.dialogAddGroup.open(JoinGroupComponent, dialogConfig);
  }
}
