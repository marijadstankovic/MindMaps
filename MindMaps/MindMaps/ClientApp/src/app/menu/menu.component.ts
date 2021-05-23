import { Component, OnInit } from '@angular/core';
import { ServiceSignalR } from '../service/ServiceSignalR';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  hideAddGroupForm = true;
  hideJoinGroupForm = true;
  constructor(public serviceSignalR: ServiceSignalR) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
    this.serviceSignalR.stopConnection();
  }

  openAddGroupForm() {
    this.hideAddGroupForm = false;
  }

  joinGroupForm(){
    this.hideJoinGroupForm = false;
  }
}
