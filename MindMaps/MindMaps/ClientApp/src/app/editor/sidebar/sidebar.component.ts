import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/_services/editor.service';
import SIDEBAR_BASIC_SHAPES from '../../_config/mx-sidebar-basic-shapes';

// treba ono kako roditelj salje deci
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  shapes = SIDEBAR_BASIC_SHAPES;
  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.onChange();

    // console.log(this.shapes);
  }

  handleSidebarItems() {
    // const { editor } = this.props;
    // this.editorService
    // if (editor && editor.initSidebar) {
      // const sidebarItems = document.querySelectorAll('.custom-sidebar-node');

      // const newSidebarItems = Array.from(sidebarItems).filter((item) => {
      //   if (!item.classList.contains('has-inited')) {
      //     item.classList.add('has-inited');
      //     return true;
      //   }
      //   return false;
      // });

      this.editorService.initSidebar(this.shapes);
    // }
  }

  onChange() {
    setTimeout(() => {
      this.handleSidebarItems();
    }, 1000);
  }
}
