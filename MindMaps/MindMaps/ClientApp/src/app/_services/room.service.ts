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

  getRoomsByUserID(userId: any) {
    return this.http.get(this.baseUrl + "RoomUsers/Rooms/" + userId);
  }
}


