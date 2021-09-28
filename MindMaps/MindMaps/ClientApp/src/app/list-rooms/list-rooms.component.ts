import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChangeRoomNameComponent } from '../dialogs/change-room-name/change-room-name.component';
import { FormRoomComponent } from '../dialogs/form-room/form-room.component';
import { JoinGroupComponent } from '../dialogs/join-group/join-group.component';
import { LeaveGroupComponent } from '../dialogs/leave-group/leave-group.component';
import { RoomDetailsDialogComponent } from '../dialogs/room-details-dialog/room-details-dialog.component';
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
  @ViewChild('input', { static: false }) input: ElementRef;
  dataSource: ListRoomsDataSource;
  displayedColumns = ['id', 'name', 'dateOfCreation','actions'];
  lenght: any;
  showActionButtons = false;

  constructor(public roomService: RoomService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new ListRoomsDataSource(this.roomService);
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openAddGroupForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(FormRoomComponent, dialogConfig)
      .afterClosed().subscribe(res => {
        this.ngOnInit();});
  }

  joinGroupForm() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(JoinGroupComponent, dialogConfig);
  }

  changeRoomName(idRoom: any) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ChangeRoomNameComponent, { data: idRoom });
  }

  leaveGroupe(idRoom: any) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(LeaveGroupComponent, { data: idRoom });
  }

  getRoomDetails(room: any) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(RoomDetailsDialogComponent, { data: room });
  }

  nextStepForOpenDocument(row: ListRoomsItem) {
    localStorage.setItem("roomId", row.id.toString());
    this.router.navigate(["/documents"]);
  }
}
