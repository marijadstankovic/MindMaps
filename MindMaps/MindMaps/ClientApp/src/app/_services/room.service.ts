import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  add(model: any) {
    return this.http.post(this.baseUrl + "rooms", model);
  }

  join(model: any) {
    return this.http.post(this.baseUrl + "roomusers", model);
  }

  leave(roomID: any, userID: any) {
    return this.http.delete(this.baseUrl + "RoomUsers/" + roomID + "/" + userID);
  }

  changeRoomName(roomID: any, name: any) {
    return this.http.put<any>(this.baseUrl + "Rooms/RoomName/" + roomID, name);
  }

  getRoomsByUserID(userId: any) {
    return this.http.get(this.baseUrl + "RoomUsers/Rooms/" + userId);
  }
  
  getMindMap(mapId: number) {
    return this.http.get(this.baseUrl + "MindMaps/" + mapId);
  }

  getComments(mapId: number) {
    return this.http.get(this.baseUrl + "Comments?mindMapId=" + mapId);
  }

  getChatHistory(destinataryId: any, size: number, page: number) {
    // return this.http.get(this.baseUrl + "GetMessageHistory?chatId=" + destinataryId 
    //   + "&size=" + size
    //   + "&page=" + page);

    return this.http.get(this.baseUrl + "Messages/GetMessageHistory/" + destinataryId 
      + "/" + size
      + "/" + page);
  }
}


