import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-documents-page',
  templateUrl: './list-documents-page.component.html',
  styleUrls: ['./list-documents-page.component.css']
})
export class ListDocumentsPageComponent implements OnInit {
  showBtns: boolean = true;
  roomid: any;

  constructor() {
  }

  ngOnInit() {
    this.roomid = parseInt(localStorage.getItem("roomId"));
  }

}
