import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat/chat.component';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './_services/auth.service';

import { MaterialModule } from './login/material.module';
import { NavMenuModule } from './nav-menu/nav-menu.module'; 
import { MenuComponent } from './nav-menu/menu/menu.component';
import { CommonModule } from '@angular/common';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { MatSortModule } from '@angular/material/sort';
//import { ChatComponent } from 'src/app/chat/chat/chat.component';
import { NgChatModule } from 'ng-chat';
import { EditorComponent } from './editor/editor.component';
import { SidebarComponent } from './editor/sidebar/sidebar.component';
import { MatButtonModule, MatDialogModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToolbarComponent } from './editor/toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { CommentsComponent } from './editor/comments/comments.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { LeaveGroupComponent } from './dialogs/leave-group/leave-group.component';
import { ChangeRoomNameComponent } from './dialogs/change-room-name/change-room-name.component';
import { RoomDetailsDialogComponent } from './dialogs/room-details-dialog/room-details-dialog.component';
import { RoomDetailsDialogModule } from './dialogs/room-details-dialog/room-details-dialog.module';
import { CreateMindmapsComponent } from './dialog/create-mindmaps/create-mindmaps.component';
import { ListDocumentsPageComponent } from './list-documents-page/list-documents-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChatComponent,
    LoginComponent,
    MenuComponent,
    ListRoomsComponent,
    EditorComponent,
    SidebarComponent,
    ToolbarComponent,
    CommentsComponent,
    LeaveGroupComponent,
    ChangeRoomNameComponent,
    RoomDetailsDialogComponent,
    CreateMindmapsComponent,
    ListDocumentsPageComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    NavMenuModule,
    NgChatModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'chat', component: ChatComponent },
      { path: 'login', component: LoginComponent },
      { path: 'documents', component: ListDocumentsPageComponent },
      { path: 'editor/:id', component: EditorComponent}
    ]),
    BrowserAnimationsModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RoomDetailsDialogModule
  ],
  exports: [
    MatProgressBarModule,
    MatDialogModule
  ],
  entryComponents: [
    ChangeRoomNameComponent,
    LeaveGroupComponent,
    RoomDetailsDialogComponent,
    CreateMindmapsComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
