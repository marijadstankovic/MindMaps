import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { MindmapsService } from '../_services/mindmaps.service';

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
  lenght: number = 0;

  constructor(private mindmapsService: MindmapsService, private room:any) {
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
      this.paginator.page
    ];
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data.value]);
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

  

  public loadData() {
    this.mindmapsService.getMindmapsByRoomID(this.room.id).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingData.next(false)))
      .subscribe(res => {
        this.data.next(res as ListMindMapsItem[]);
        this.lenght = this.data.value.length;
    });
  }
}

