import { NgModule } from '@angular/core';
import { MenuModule } from '../menu/main.module';

const modules = [MenuModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class NavMenuModule { };
