import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material';
import { FormProfileComponent } from '../form-profile/form-profile.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormProfileModule } from '../form-profile/from-profile.module';
import { CommonModule } from '@angular/common';

const modules = [MatMenuModule];
const input = [MatDialogModule, MatMenuModule, CommonModule, FormsModule, MatInputModule, FormProfileModule] 

@NgModule({
  declarations: [FormProfileComponent],
  imports: input,
  exports: modules,
  entryComponents: [FormProfileComponent]
})

export class MenuModule { };
