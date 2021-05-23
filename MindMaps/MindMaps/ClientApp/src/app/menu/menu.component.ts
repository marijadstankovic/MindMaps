import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormProfileComponent } from '../form-profile/form-profile.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  hideAddGroupForm = true;
  constructor(public dialogProfile: MatDialog) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
  }

  openAddGroupForm() {
    this.hideAddGroupForm = false;
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
