import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CreateMindmapsComponent } from '../dialog/create-mindmaps/create-mindmaps.component';
import { MatDialog, MatPaginator, MatSort, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { MindmapsService } from '../_services/mindmaps.service';
import { ListMindMapsDataSource, ListMindMapsItem } from './list-documents-datasource';
import { ChangeRoomNameComponent } from '../dialogs/change-room-name/change-room-name.component';

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

  constructor(private mindmapsService: MindmapsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new ListMindMapsDataSource(this.mindmapsService, this.roomID);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  addDocumentDialog() {    
    this.dialog.open(CreateMindmapsComponent, { data: this.roomID });
  }

  changeName(mapId: number) {
    this.dialog.open(ChangeRoomNameComponent, { data: mapId });
  }

  goToEditor(mapId: number) {
    this.router.navigate(['/editor', mapId]);
  }
}
