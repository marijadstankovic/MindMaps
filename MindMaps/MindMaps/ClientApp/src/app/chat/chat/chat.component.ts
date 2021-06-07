import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ServiceSignalR } from 'src/app/_services/ServiceSignalR';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChatAdapter } from 'ng-chat';
import { SignalRGroupAdapter } from '../SignalRGroupAdapter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public adapter: SignalRGroupAdapter;

  constructor(public serviceSignalR: ServiceSignalR, private http: HttpClient) {}

  ngOnInit() {
    this.adapter = new SignalRGroupAdapter(this.http, this.serviceSignalR);
   /* const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:5001/ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }) //44377
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (message) => {
      alert(message);
      console.log(message);
    });
    */
    // this.serviceSignalR.startConnection();
    setTimeout( () => {
      console.log("waiting");
    // this.serviceSignalR.addToGroup();
    // this.serviceSignalR.addToAllGroups();
    // this.serviceSignalR.addTransferDataListener();
    // this.serviceSignalR.addBroadcastDataListener();
    },500);
    

    this.http.get('https://localhost:5001/api/users')
      .subscribe(res => {
        console.log(res);
      })
  }

  public onClick = (event) => {
    const message: string = (document.getElementById("text") as HTMLInputElement).value;
    console.log("Kliknuto" + message);
    this.serviceSignalR.broadcastData(1001, message);
  }


}
