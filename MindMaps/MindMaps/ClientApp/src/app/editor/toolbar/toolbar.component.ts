import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditorService } from 'src/app/_services/editor.service';
import { SnackBarService } from '../../_services/snack-bar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() showComments = new EventEmitter();

  panning = false;
  constructor(private editor: EditorService, private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  save() {
    // const diagramXml = window.localStorage.getItem('autosaveXml');

    //     updateDiagramData(diagramXml);
    this.snackBarService.openSnackBar('diagram saved', 'OK');
  }

  group() {
    const cellsSelected = this.editor.graph.getSelectionCells();

    if (!(cellsSelected && cellsSelected.length > 1)) {
      return false;
    }

    let hasGroupCell = false;
    cellsSelected.forEach((cell) => {
      if (cell.isGroupCell || cell.isGrouped) {
        hasGroupCell = true;
      }
    });

    if (hasGroupCell) {
      // message.warning('can not group twice on the same cell');

      return false;
    }

    const allCells = this.editor.graph.model.cells;

    let groupCount = 1;
    allCells && Object.keys(allCells).forEach((index) => {
      if (allCells[index].isGroupCell) {
        groupCount += 1;
      }
    });

    const groupName = `group${groupCount}`;

    const { cellsGrouped } = this.editor.groupCells(cellsSelected, groupName);

    const nodeCodes = [];

    cellsGrouped.forEach((item) => {
      if (item.nodeCode) {
        nodeCodes.push(item.nodeCode);
      }
    });

    return true; //

  }

  ungroup() {
    const cellsSelected = this.editor.graph.getSelectionCells();

    if (!(cellsSelected && cellsSelected.length !== 0)) {
      return false;
    }

    this.editor.ungroupCells(cellsSelected);

    return true;
  }

  zoomOut() {
    this.editor.graph.zoomOut();
  }

  zoomIn() {
    this.editor.graph.zoomIn();
  }

  zoomActual() {
    this.editor.graph.zoomActual();
  }

  move(event) {
    // e.currentTarget.classList.toggle('active');

    var targetEle = event.srcElement.attributes.class;

    this.panning = !this.panning;

    if (this.panning) {
      this.editor.startPanning();
    } else {
      this.editor.stopPanning();
    }
  }

  comments() {
    this.showComments.emit();
  }
}
