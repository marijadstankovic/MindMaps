import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
//import { ServiceSignalR } from './_services/ServiceSignalR';
import { AuthService } from './_services/auth.service';
import { ChatHubService } from './_services/chat-hub.service';
// import * as mx from 'mxgraph';
//declare var mxGraph: any;
//declare var mxHierarchicalLayout: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;

  constructor(private authService: AuthService, private serviceSignalR: ChatHubService) {
  }

  ngAfterViewInit(): void {

    if (this.loggedin())
      this.serviceSignalR.startConnection();
  }

  loggedin(){
    return this.authService.loggedin();
  }
}
