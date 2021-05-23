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

  public stopConnection() {
    this.hubConnection.stop();
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
  
  public addToAllGroups = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    this.hubConnection.invoke('AddToAllGroups', +user.nameid)
      .catch(err => console.error(err));
  }

  public broadcastData = (chatID: number, message: string) => {
    var user = JSON.parse(localStorage.getItem('user'));
    this.hubConnection.invoke('SendMessage', +user.nameid, chatID, message)
      .catch(err => console.error(err));
  }
  public addBroadcastDataListener = () => {
    this.hubConnection.on('BroadcastMessage', (userId, message, chatId) => {
      //this.bradcastedData = data;
      // OVDE SE DODAJE FILTER? ? ? ? ? ? ?
      console.log(userId + " " + message + " " + chatId);
    })
  }

}


export interface ChatModel {
  message: string,
  name: string
}
