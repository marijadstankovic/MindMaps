import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  hideAddGroupForm = true;
  constructor() { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("token");
  }

  openAddGroupForm() {
    this.hideAddGroupForm = false;
  }
}
