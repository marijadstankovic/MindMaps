import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { MindmapsService } from '../_services/mindmaps.service';
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

  constructor(private mindmapsService: MindmapsService) { }

  ngOnInit() {
    this.dataSource = new ListMindMapsDataSource(this.mindmapsService, this.room);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
