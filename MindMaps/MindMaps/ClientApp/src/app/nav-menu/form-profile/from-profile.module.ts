import { NgModule } from "@angular/core";
import { MenuComponent } from "../menu/menu.component";
import { MatInputModule, MatButtonModule, MatFormFieldModule } from "@angular/material";


const modules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
];

@NgModule({
  imports: modules,
  exports: modules,
  entryComponents: [MenuComponent]
})

export class FormProfileModule { };
