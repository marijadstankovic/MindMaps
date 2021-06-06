import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceSignalR } from '../_services/ServiceSignalR';

export class SignalRGroupAdapter extends ChatAdapter implements IChatGroupAdapter {
  public userId: string;

  private hubConnection: signalR.HubConnection
  public static serverBaseUrl: string = 'https://ng-chat-api.azurewebsites.net/'; // Set this to 'https://localhost:5001/' if running locally

  username: string;
  jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient,
    private serviceSignalR: ServiceSignalR) {
    super();
    const userT = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(userT);
    this.username = decodedToken.username;
    this.initializeListeners();
    this.userId = decodedToken.nameid
  }

//   private initializeConnection(): void {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl(`${SignalRGroupAdapter.serverBaseUrl}groupchat`)
//       .build();

//     this.hubConnection
//       .start()
//       .then(() => {
//         this.joinRoom();

//         this.initializeListeners();
//       })
//       .catch(err => console.log(`Error while starting SignalR connection: ${err}`));
//   }

  private initializeListeners(): void {

    this.serviceSignalR.messageEvent$.subscribe(messageObject => {
        const participant: IChatParticipant = {
            participantType: ChatParticipantType.Group,
            id: messageObject.chatId,
            status: null,
            avatar: null,
            displayName: messageObject.chatId
        }

        const message: Message = {
            fromId: messageObject.userId,
            toId: this.userId,
            message: messageObject.message,
        }
    
        this.onMessageReceived(participant, messageObject.message);
    })

    // this.hubConnection.on("generatedUserId", (userId) => {
    //   // With the userId set the chat will be rendered
    //   this.userId = userId;
    // });

    // this.hubConnection.on("messageReceived", (participant, message) => {
    //   // Handle the received message to ng-chat
    //   this.onMessageReceived(participant, message);
    // });

    // this.hubConnection.on("friendsListChanged", (participantsResponse: Array<ParticipantResponse>) => {
    //   // Use polling for the friends list for this simple group example
    //   // If you want to use push notifications you will have to send filtered messages through your hub instead of using the "All" broadcast channel
    // DODAJ  this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.userId));
    // });
  }

//   joinRoom(): void {
//     if (this.hubConnection && this.hubConnection.state == signalR.HubConnectionState.Connected) {
//       this.hubConnection.send("join", this.username);
//     }
//   }

  listFriends(): Observable<ParticipantResponse[]> {
    // List connected users to show in the friends list
    // Sending the userId from the request body as this is just a demo 
    return this.http
      .post(`${SignalRGroupAdapter.serverBaseUrl}listFriends`, { currentUserId: this.userId })
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error.error || 'Server error'))
      );
  }

  getMessageHistory(destinataryId: any): Observable<Message[]> {
    // This could be an API call to your web application that would go to the database
    // and retrieve a N amount of history messages between the users.
    return of([]);
  }

  sendMessage(message: Message): void {
    // if (this.hubConnection && this.hubConnection.state == signalR.HubConnectionState.Connected)
    //   this.hubConnection.send("sendMessage", message);

    this.serviceSignalR.broadcastData(message.toId, message.message);
  }

  groupCreated(group: Group): void {
    // this.hubConnection.send("groupCreated", group);
    //TODO
  }
}