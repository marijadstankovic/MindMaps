import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material';
import { FormProfileComponent } from '../../dialogs/form-profile/form-profile.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormProfileModule } from '../../dialogs/form-profile/from-profile.module';
import { CommonModule } from '@angular/common';
import { JoinGroupComponent } from '../../dialogs/join-group/join-group.component';
import { FormRoomComponent } from '../../dialogs/form-room/form-room.component';

const modules = [MatMenuModule];
const input = [MatDialogModule, MatMenuModule, CommonModule, FormsModule, MatInputModule, FormProfileModule] 

@NgModule({
  declarations: [
    FormProfileComponent,
    FormRoomComponent,
    JoinGroupComponent
  ],
  imports: input,
  exports: modules,
  entryComponents: [
    FormProfileComponent,
    FormRoomComponent,
    JoinGroupComponent
  ]
})

export class MenuModule { };
