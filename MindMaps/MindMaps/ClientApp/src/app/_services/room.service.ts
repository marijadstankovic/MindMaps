import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getMindMap(mapId: number) {
    return this.http.get(this.baseUrl + "MindMaps/" + mapId);
  }
}

