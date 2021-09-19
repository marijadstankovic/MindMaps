import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = "https://localhost:5001/api/";
    user: any;
  constructor(private http: HttpClient) { }

  getUser(index: any): any {
    return this.http.get(this.baseUrl + "Users/" + index);
  }

  updateUser(userUid: any, editUser: any) {
    return this.http.put<any>(this.baseUrl + "Users/" + userUid, editUser);
  }
}
