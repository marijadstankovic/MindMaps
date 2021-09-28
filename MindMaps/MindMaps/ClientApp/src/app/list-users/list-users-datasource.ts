import { DataSource } from "@angular/cdk/collections";
import { MatPaginator, MatSort } from "@angular/material";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, merge, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { ProfileService } from "../_services/profile.service";

export interface ListUsersItem {
  Name: string;
  LastName: string;
  Email: string;
}

export class ListUsersDataSource extends DataSource<ListUsersItem> {

  data = new BehaviorSubject<ListUsersItem[]>([]);
  loadingData = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingData.asObservable();

  paginator: MatPaginator;
  UserUid: any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  lenght: number = 0;

  constructor(private profileService: ProfileService, private roomID : number) {
    super();
  }
 
  connect(): Observable<ListUsersItem[]> {
     const dataMutations = [
      this.data.asObservable(),
      this.paginator.page
    ];
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data.value]);
    }));
  }

  disconnect() {
    this.data.complete();
    this.loadingData.complete();
  }

  private getPagedData(data: ListUsersItem[]) {

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  public loadData() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.UserUid = +this.decodedToken.nameid;
    this.profileService.GetUsersByRoomID(this.roomID).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingData.next(false)))
      .subscribe(res => {
        this.data.next(res as ListUsersItem[]);
        this.lenght = this.data.value.length;

        console.log(this.data.value);
      });
  }
}


