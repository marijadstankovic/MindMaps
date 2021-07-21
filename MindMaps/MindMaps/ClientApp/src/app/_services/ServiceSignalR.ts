import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServiceSignalR {
  public data: ChatModel;
  public bradcastedData: ChatModel[];
  public tekst: string;
  private emitter: EventEmitter;
  public messageEvent$ = new BehaviorSubject<any>({});

  private hubConnection: signalR.HubConnection

  public async startConnection(): Promise<void> {
    const token = localStorage.getItem('token');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:5001/ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token
        }) //44377
      .build();
    
    await this.hubConnection.start().catch(err => console.error(err.toString()));
    console.log('SignalR Connected!');
    this.addToAllGroups();
    this.addTransferDataListener();
    this.addBroadcastDataListener();
    // }).catch(function (err) {
    //   return console.error(err.toString());
    // });
    this.emitter = new EventEmitter();
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
      this.messageEvent$.next(
        {
          userId,
          message,
          chatId
        }
      );
      console.log('message received' + userId + " " + message + " " + chatId);
      // this.emitter.emit(chatId, message);
    })
  }

}


export interface ChatModel {
  message: string,
  name: string
}