import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { EditorService } from './editor.service';

@Injectable({
  providedIn: 'root'
})
export class EditorHubService {

  private hubConnection: signalR.HubConnection

  constructor(
    private editorService: EditorService) { 
      this.startConnection();
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
    // this.addToAllGroups();
    // this.addTransferDataListener();
    // this.addBroadcastDataListener();
    this.recieveGraph();
    // }).catch(function (err) {
    //   return console.error(err.toString());
    // });
    // this.emitter = new EventEmitter();
  }

  public sendGraph(xml){
    this.hubConnection.invoke('UpdateGraph', xml)
    .catch(err => console.error(err));
  }

  public recieveGraph = () => {
    // debugger;
    this.hubConnection.on('MindMapGraph', (xml) => {
      // debugger;
      // render
      this.editorService.renderGraphFromXml(xml);
      // save to local storage
      window.localStorage.setItem('autosaveXml', xml);
    })
  }


}
