import { Injectable } from '@angular/core';
import { HttpClient } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class MindmapsService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getMindmapsByRoomID(roomID: any): any {
    return this.http.get(this.baseUrl + "MindMaps/ByRoomId/" + roomID);
  }
}
