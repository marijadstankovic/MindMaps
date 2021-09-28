import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { EditorService } from './editor.service';

interface comment {
  id: number,
  text: string,
  dateTime: Date,
  userId: number,
  username: string,
  mindMapId: number
}

@Injectable({
  providedIn: 'root'
})
export class EditorHubService {

  private hubConnection: signalR.HubConnection
  public commentAdded = new EventEmitter;
  public commentRemoved = new EventEmitter;

  constructor(
    private editorService: EditorService) {
  }

  public async startConnection(): Promise<void> {
    const token = localStorage.getItem('token');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:5001/EditorHub',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token
        }) //44377
      .build();

    await this.hubConnection.start().catch(err => console.error(err.toString()));
    console.log('SignalR editor Connected!');
    
    this.recieveGraph();
    this.recieveComment();
  }

  public addToGroup(mapId: number) {
    this.hubConnection.invoke('AddToGroup', mapId)
      .then(a => console.log('added to a group ' + a))
      .catch(err => console.log(err));
  }

  public removeFromGroup(mapId: number) {
    this.hubConnection.invoke('RemoveFromGroup', mapId)
      .then(a => console.log('removed from a group ' + a))
      .catch(err => console.log(err));
  }

  public sendGraph(mapId: number, xml) {
    this.hubConnection.invoke('UpdateGraph', mapId, xml)
      .catch(err => console.error(err));
  }

  public recieveGraph = () => {
    this.hubConnection.on('MindMapGraph', (xml) => {
      
      this.editorService.renderGraphFromXml(xml);
      window.localStorage.setItem('autosaveXml', xml);
    })
  }

  public addComment(text: string, mapId: number, userId: number) {
    this.hubConnection.invoke('AddComment', text, mapId, userId)
      .catch(err => console.error(err));
  }

  public deleteComment(commentId: number, mapId: number) {
    this.hubConnection.invoke('RemoveComment', commentId, mapId)
      .catch(err => console.error(err));
  }

  public recieveComment() {
    this.hubConnection.on('CommentAdded', (obj) => {
      debugger;
      console.log(obj);
      this.commentAdded.next(obj);
    })
    this.hubConnection.on('CommentRemoved', (obj) => {
      console.log(obj);
      this.commentRemoved.next(obj);
    })
  }

}
