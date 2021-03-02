import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";


@Injectable({
  providedIn: 'root'
})

export class ServiceSignalR {
  public data: ChatModel[];

  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:5001/ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }) //44377
      .build();

    this.hubConnection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });
  }

  public addTransferDataListener = () => {
    this.hubConnection.on('BroadcastMessage', (data) => {
      this.data = data;
      console.log(data);
    });
  }


}


export interface ChatModel {
  message: string,
  name: string
}
