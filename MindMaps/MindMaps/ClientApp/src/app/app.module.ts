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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//import { ChatComponent } from 'src/app/chat/chat/chat.component';
import { NgChatModule } from 'ng-chat';
import { EditorComponent } from './editor/editor.component';
import { SidebarComponent } from './editor/sidebar/sidebar.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToolbarComponent } from './editor/toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

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
    ToolbarComponent
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
      { path: 'chat', component: ChatComponent },
      { path: 'login', component: LoginComponent },
      { path: 'editor/:id', component: EditorComponent}
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
