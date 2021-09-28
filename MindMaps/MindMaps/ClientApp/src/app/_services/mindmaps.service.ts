import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MindmapsService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getMindmapsByRoomID(roomID: any): any {
    return this.http.get(this.baseUrl + "MindMaps/ByRoomId/" + roomID);
  }

  createMindmap(roomID: number, documentName: string): Observable<any> {
    const request = {
      roomId: roomID,
      name: documentName
    }
    return this.http.post(this.baseUrl + "MindMaps", request);
  }
}
