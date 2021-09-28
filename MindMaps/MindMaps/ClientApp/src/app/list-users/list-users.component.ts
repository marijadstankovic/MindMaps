import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ProfileService } from '../_services/profile.service';
import { ListUsersDataSource, ListUsersItem } from './list-users-datasource';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @Input() roomID: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<ListUsersItem>;
  dataSource: ListUsersDataSource;
  displayedColumns = ['name', 'lastName', 'email'];
  lenght: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.dataSource = new ListUsersDataSource(this.profileService, this.roomID);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
