import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant, PagedHistoryChatAdapter } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { JwtHelperService } from '@auth0/angular-jwt';
// import { ServiceSignalR } from '../_services/ServiceSignalR';
import { ListRoomService } from '../_services/list-room.service';
import { ChatHubService } from '../_services/chat-hub.service';
import { RoomService } from '../_services/room.service';
// import { MessageType } from 'ng-chat/ng-chat/core/message-type.enum';

export class SignalRGroupAdapter extends PagedHistoryChatAdapter implements IChatGroupAdapter {// extends ChatAdapter implements IChatGroupAdapter {//
  public userId: string;

  public participants: Group[] = [];

  //private hubConnection: signalR.HubConnection
  //public static serverBaseUrl: string = "https://localhost:5001/";

  username: string;
  jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient,
    private serviceSignalR: ChatHubService,
    private listRoomService: ListRoomService,
    private roomService: RoomService) {

    super();

    const userT = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(userT);
    this.username = decodedToken.unique_name;
    this.initializeListeners();
    this.userId = decodedToken.nameid;

  }


  private initializeListeners(): void {
    
    this.listRoomService.getChats().subscribe( (response: Group[]) => {      
      this.participants = response.map(x => {
        x.status = ChatParticipantStatus.Online;
        return x;
      });      
    });

    this.serviceSignalR.messageEvent$.subscribe(messageObject => {
      const participant = this.participants.find(x => x.id == messageObject.chatId);
      const message: Message = {
        type: 1,
        fromId: messageObject.userId,
        toId: this.userId,
        message: messageObject.message,
        dateSent: new Date(),
      }
      this.onMessageReceived(participant, message);
    });

    // this.hubConnection.on("generatedUserId", (userId) => {
    //   // With the userId set the chat will be rendered
    //   this.userId = userId;
    // });


    // this.hubConnection.on("friendsListChanged", (participantsResponse: Array<ParticipantResponse>) => {
    //   // Use polling for the friends list for this simple group example
    //   // If you want to use push notifications you will have to send filtered messages through your hub instead of using the "All" broadcast channel
    // DODAJ  this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.userId));
    // });
  }



  getMessageHistory(destinataryId: any): Observable<Message[]> {
    const response = this.roomService.getChatHistory(destinataryId, 50, 1);
    return response as Observable<Message[]>;
    //console.log('getMessageHistory');
    //const message: Message = {
    //  type: 1,
    //  fromId: 1, // messageObject.chatId, // // messageObject.userId, //
    //  toId: this.userId,
    //  message: 'messageObject.message',
    //  dateSent: new Date(),
    //}
    //return of([message]);
    
    //return of([]);
  }

  getMessageHistoryByPage(destinataryId: any, size: number, page: number): Observable<Message[]> {
    const response = this.roomService.getChatHistory(destinataryId, size, page);
    return response as Observable<Message[]>;
  }

  sendMessage(message: Message): void {
    this.serviceSignalR.broadcastData(message.toId, message.message);
  }

  groupCreated(group: Group): void {
    // this.hubConnection.send("groupCreated", group);
    //TODO
    console.log("group created");
  }




  listFriends(): Observable<ParticipantResponse[]> {

    return of(this.participants.map(user => { 
      let participantResponse = new ParticipantResponse();
      participantResponse.participant = user;

      return participantResponse;
    }));
  }
}
