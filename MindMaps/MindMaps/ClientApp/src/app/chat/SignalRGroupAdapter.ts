import { ChatAdapter, IChatGroupAdapter, User, Group, Message, ChatParticipantStatus, ParticipantResponse, ParticipantMetadata, ChatParticipantType, IChatParticipant } from 'ng-chat';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceSignalR } from '../_services/ServiceSignalR';
// import { MessageType } from 'ng-chat/ng-chat/core/message-type.enum';

export class SignalRGroupAdapter extends ChatAdapter implements IChatGroupAdapter {
  public userId: string;

  private hubConnection: signalR.HubConnection
  public static serverBaseUrl: string = "https://localhost:5001/";

  username: string;
  jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient,
    private serviceSignalR: ServiceSignalR) {
    super();
    const userT = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(userT);
    this.username = decodedToken.unique_name;
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
            type: 1,
            fromId: messageObject.userId,
            toId: this.userId,
            message: messageObject.message,
        }
    
        this.onMessageReceived(participant, message);
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

  // listFriends(): Observable<ParticipantResponse[]> {
  //   // List connected users to show in the friends list
  //   // Sending the userId from the request body as this is just a demo 
  //   return this.http
  //     .post(`${SignalRGroupAdapter.serverBaseUrl}listFriends`, { currentUserId: this.userId })
  //     .pipe(
  //       map((res: any) => res),
  //       catchError((error: any) => Observable.throw(error.error || 'Server error'))
  //     );
  // }

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




  public static mockedParticipants: IChatParticipant[] = [
    {
      participantType: ChatParticipantType.User,
      id: 1,
      displayName: "Arya Stark",
      avatar: "https://66.media.tumblr.com/avatar_9dd9bb497b75_128.pnj",
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 1001,
      displayName: "Cersei Lannister",
      avatar: null,
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 1003,
      displayName: "Daenerys Targaryen",
      avatar: "https://68.media.tumblr.com/avatar_d28d7149f567_128.png",
      status: ChatParticipantStatus.Busy
    },
    {
      participantType: ChatParticipantType.User,
      id: 1004,
      displayName: "Eddard Stark",
      avatar: "https://pbs.twimg.com/profile_images/600707945911844864/MNogF757_400x400.jpg",
      status: ChatParticipantStatus.Offline
    },
    {
      participantType: ChatParticipantType.User,
      id: 1005,
      displayName: "Hodor",
      avatar: "https://pbs.twimg.com/profile_images/378800000449071678/27f2e27edd119a7133110f8635f2c130.jpeg",
      status: ChatParticipantStatus.Offline
    },
    {
      participantType: ChatParticipantType.User,
      id: 1006,
      displayName: "Jaime Lannister",
      avatar: "https://pbs.twimg.com/profile_images/378800000243930208/4fa8efadb63777ead29046d822606a57.jpeg",
      status: ChatParticipantStatus.Busy
    },
    {
      participantType: ChatParticipantType.User,
      id: 1007,
      displayName: "John Snow",
      avatar: "https://pbs.twimg.com/profile_images/3456602315/aad436e6fab77ef4098c7a5b86cac8e3.jpeg",
      status: ChatParticipantStatus.Busy
    },
    {
      participantType: ChatParticipantType.User,
      id: 1008,
      displayName: "Lorde Petyr 'Littlefinger' Baelish",
      avatar: "http://68.media.tumblr.com/avatar_ba75cbb26da7_128.png",
      status: ChatParticipantStatus.Offline
    },
    {
      participantType: ChatParticipantType.User,
      id: 1009,
      displayName: "Sansa Stark",
      avatar: "http://pm1.narvii.com/6201/dfe7ad75cd32130a5c844d58315cbca02fe5b804_128.jpg",
      status: ChatParticipantStatus.Online
    },
    {
      participantType: ChatParticipantType.User,
      id: 1010,
      displayName: "Theon Greyjoy",
      avatar: "https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg",
      status: ChatParticipantStatus.Away
    }];

  listFriends(): Observable<ParticipantResponse[]> {
    return of(SignalRGroupAdapter.mockedParticipants.map(user => {
      let participantResponse = new ParticipantResponse();

      participantResponse.participant = user;
      participantResponse.metadata = {
        totalUnreadMessages: Math.floor(Math.random() * 10)
      }

      return participantResponse;
    }));
  }
}
