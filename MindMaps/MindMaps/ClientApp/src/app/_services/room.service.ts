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
}

