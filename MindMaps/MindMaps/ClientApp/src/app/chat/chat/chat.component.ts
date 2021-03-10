import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ServiceSignalR } from 'src/app/service/ServiceSignalR';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public serviceSignalR: ServiceSignalR, private http: HttpClient) {}


  public onClick = (event) => {
    console.log("Kliknuto" + (document.getElementById("text") as HTMLInputElement).value);
    this.serviceSignalR.broadcastData();
  }
  ngOnInit() {
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
    this.serviceSignalR.startConnection();
    this.serviceSignalR.addTransferDataListener();
    this.serviceSignalR.addBroadcastDataListener();
    this.http.get('https://localhost:5001/api/users')
      .subscribe(res => {
        console.log(res);
      })
  }


}
