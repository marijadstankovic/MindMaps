import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocumentsComponent } from '../../list-documents/list-documents.component';
import { ListUsersComponent } from '../../list-users/list-users.component';
import { MatIconModule,  MatMenuModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListDocumentsComponent,
    ListUsersComponent
  ],
  imports: [
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ListDocumentsComponent,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    ListUsersComponent,
    HttpClientModule
  ],
  entryComponents: [
    ListDocumentsComponent,
    ListUsersComponent
  ]
})
export class RoomDetailsDialogModule { }
