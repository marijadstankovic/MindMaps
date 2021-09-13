import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RoomService } from '../_services/room.service';
import { ListRoomsDataSource, ListRoomsItem } from './list-rooms-datasource';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ListRoomsItem>;
  dataSource: ListRoomsDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'dateOfCreation'];
  lenght: any;

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
    this.dataSource = new ListRoomsDataSource(this.roomService);
    console.log(this.dataSource );
    //if (typeof this.dataSource.data === undefined) {
    //  this.lenght = 0;
    //}
    //else {
    //  this.lenght = this.dataSource.data.length;
    //}
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.ngOnInit();
  }
}
