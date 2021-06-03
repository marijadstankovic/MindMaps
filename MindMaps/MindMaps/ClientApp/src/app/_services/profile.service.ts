import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  getUser(index: any) {
    return this.http.get(this.baseUrl + "Users/" + index)
      .subscribe(res => { return res; })
  }

}
