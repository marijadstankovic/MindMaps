import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { };

