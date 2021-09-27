import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';
import { EditorService } from './editor.service';


export interface ChatModel {
  message: string,
  name: string
}


@Injectable({
  providedIn: 'root'
})

export class ChatHubService {

  public data: ChatModel;
  public bradcastedData: ChatModel[];
  public tekst: string;
  public messageEvent$ = new BehaviorSubject<any>({});
  public groupsUpdatedEvent$ = new BehaviorSubject<any>({});

  private hubConnection: signalR.HubConnection

  constructor() {
    // this.startConnection();
  }

  public async startConnection(): Promise<void> {
    const token = localStorage.getItem('token');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:5001/ChatHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token
        })
      .build();

    await this.hubConnection.start().catch(err => console.error(err.toString()));
    console.log('SignalR Connected!');
    this.addToAllGroups();
    this.addTransferDataListener();
    this.addBroadcastDataListener();
    this.addUpdateDataListener();

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

  public addToGroup = (chatId: number) => {
    this.hubConnection.invoke('AddToGroup', chatId)
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

      this.messageEvent$.next(
        {
          userId,
          message,
          chatId
        }
      );
      console.log('message received' + userId + " " + message + " " + chatId);

    })
  }

  public addUpdateDataListener = () => {
    this.hubConnection.on('UpdateChatList', () => this.groupsUpdatedEvent$.next(new Object()));
  }
}
