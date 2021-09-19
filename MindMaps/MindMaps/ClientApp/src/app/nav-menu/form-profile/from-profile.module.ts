import { NgModule } from "@angular/core";
import { MenuComponent } from "../menu/menu.component";
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatDividerModule } from "@angular/material";
import { ListRoomsComponent } from "../../list-rooms/list-rooms.component";


const modules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDividerModule
];

@NgModule({
  imports: modules,
  exports: modules,
  entryComponents: [MenuComponent, ListRoomsComponent]
})

export class FormProfileModule { };
