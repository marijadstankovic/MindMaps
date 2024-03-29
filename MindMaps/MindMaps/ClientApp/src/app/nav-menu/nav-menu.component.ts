import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { FormRoomComponent } from './form-room/form-room.component';
import { JoinGroupComponent } from './join-group/join-group.component';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  constructor(public authService: AuthService, public dialogAddGroup: MatDialog) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  loggedin() {
    return this.authService.loggedin();
  }

  openAddGroupForm() {
    //this.hideAddGroupForm = false;
    const dialogConfig = new MatDialogConfig();
    this.dialogAddGroup.open(FormRoomComponent, dialogConfig);
  }

  joinGroupForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialogAddGroup.open(JoinGroupComponent, dialogConfig);
  }
}
