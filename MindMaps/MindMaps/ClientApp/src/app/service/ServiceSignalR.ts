import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";


@Injectable({
  providedIn: 'root'
})

export class ServiceSignalR {
  public data: ChatModel;
  public bradcastedData: ChatModel[];
  public tekst: string;

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
    this.hubConnection.on('Coonected', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public addToGroup = () => {
    this.hubConnection.invoke('AddToGroup', 1)
      .catch(err => console.error(err));
  }

  public broadcastData = () => {
    this.hubConnection.invoke('SendMessage', 1, 1, (document.getElementById("text") as HTMLInputElement).value)
      .catch(err => console.error(err));
  }
  public addBroadcastDataListener = () => {
    this.hubConnection.on('BroadcastMessage', (userId, message) => {
      //this.bradcastedData = data;
      console.log(userId + " " + message);
    })
  }

  

}


export interface ChatModel {
  message: string,
  name: string
}
