import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { RoomService } from '../_services/room.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface ListMindMapsItem {
  id: number;
  DateOfCreation: Date;
  Name: string;
}

/**
 * Data source for the ListRooms view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListMindMapsDataSource extends DataSource<ListMindMapsItem> {

  data = new BehaviorSubject<ListMindMapsItem[]>([]);
  loadingData = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingData.asObservable();

  paginator: MatPaginator;
  sort: MatSort;
  UserUid: any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  lenght: number = 0;

  constructor(private roomService: RoomService, private room:any) {
    super();
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListMindMapsItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.data.asObservable(),
      this.paginator.page,
      this.sort.sortChange
    ];
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data.value]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.data.complete();
    this.loadingData.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListMindMapsItem[]) {

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListMindMapsItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.Name, b.Name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  public loadData() {
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.UserUid = +this.decodedToken.nameid;
    this.roomService.getRoomsByUserID(this.UserUid).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingData.next(false)))
      .subscribe(res => {
        this.data.next(res as ListMindMapsItem[]);
        this.lenght = this.data.value.length;
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
