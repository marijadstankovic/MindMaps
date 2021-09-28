import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { RoomService } from '../_services/room.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { ListMindMapsDataSource, ListMindMapsItem } from './list-documents-datasource';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  @Input() showActionButtons: boolean;
  @Input() room: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ListMindMapsItem>;
  dataSource: ListMindMapsDataSource;
  displayedColumns = ['id', 'name', 'dateOfCreation', 'actions'];
  lenght: any;

  constructor(private snackBarService: SnackBarService, private roomService: RoomService) { }

  ngOnInit() {
    this.dataSource = new ListMindMapsDataSource(this.roomService, this.room);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
