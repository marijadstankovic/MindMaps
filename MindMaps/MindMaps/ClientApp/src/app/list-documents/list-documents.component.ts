import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { MindmapsService } from '../_services/mindmaps.service';
import { ListMindMapsDataSource, ListMindMapsItem } from './list-documents-datasource';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  @Input() showActionButtons: boolean;
  @Input() roomID: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<ListMindMapsItem>;
  dataSource: ListMindMapsDataSource;
  displayedColumns = ['id', 'name', 'dateOfCreation', 'actions'];
  lenght: any;

  constructor(private mindmapsService: MindmapsService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new ListMindMapsDataSource(this.mindmapsService, this.roomID);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  goToEditor(mapId: number) {
    this.router.navigate(['/editor', mapId]);
  }
}
