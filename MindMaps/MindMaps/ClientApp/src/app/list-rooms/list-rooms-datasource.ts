import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RoomService } from '../_services/room.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface ListRoomsItem {
  id: number;
  DateOfCreation: Date;
  Name: string;
}

/**
 * Data source for the ListRooms view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListRoomsDataSource extends DataSource<ListRoomsItem> {
  data: ListRoomsItem[];
  paginator: MatPaginator;
  sort: MatSort;
  UserUid: any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  lenght: number;

  constructor(private roomService: RoomService) {
    super();
    const userT = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(userT);
    this.UserUid = +this.decodedToken.nameid;
    this.roomService.getRoomsByUserID(this.UserUid).subscribe(res => {
      //this.data.push.apply(this.data, res as ListRoomsItem[]);
      this.data = res as ListRoomsItem[];
    });
    debugger;
    if (typeof this.data === undefined) {
      this.lenght = 0;
    }
    else {
      this.lenght = this.data.length;
    }
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListRoomsItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListRoomsItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListRoomsItem[]) {
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
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
