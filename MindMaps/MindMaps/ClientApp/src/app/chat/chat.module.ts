import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { NgChatModule } from 'ng-chat';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    NgChatModule,
  ],
  exports: [
    NgChatModule
  ]
})
export class ChatModule {

}
