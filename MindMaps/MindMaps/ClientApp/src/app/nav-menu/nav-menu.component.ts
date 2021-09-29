import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { FormRoomComponent } from '../dialogs/form-room/form-room.component';
import { JoinGroupComponent } from '../dialogs/join-group/join-group.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  constructor(public authService: AuthService, public dialog: MatDialog, private router: Router) {
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
    this.dialog.open(FormRoomComponent, dialogConfig);
  }

  joinGroupForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(JoinGroupComponent, dialogConfig);
  }
}
