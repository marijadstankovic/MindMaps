import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Editor from '../_config/editor-base';
import { ChatHubService } from '../_services/chat-hub.service';
import { EditorHubService } from '../_services/editor-hub.service';
import { EditorService } from '../_services/editor.service';
import { RoomService } from '../_services/room.service';
import { UtilService } from '../_services/util.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;
   //https://stackoverflow.com/questions/49922708/how-to-integrate-mxgraph-with-angular-4/54689971#54689971
  //https://www.npmjs.com/package/@typed-mxgraph/typed-mxgraph

  editor: any;
  graph: any;
  state: any;
  graphContainerClickCount: number;
  counter = 5;

  private mapId: number;
  constructor(
    // private utilService: UtilService,
    private roomService: RoomService,
    private editorService: EditorService,
    private editorHubService: EditorHubService,
    private route: ActivatedRoute
    ) {
  }

  async ngOnInit(): Promise<void> {
    this.state = {
      editor: null
    };
    this.graphContainerClickCount = 0;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getMingMap();

    // join group for this mind map
    await this.editorHubService.startConnection();
    this.editorHubService.addToGroup(this.mapId);


    this.editorService.init(
      {
      container: '.graph-content',
      clickFunc: this.clickFunc,
      doubleClickFunc: this.doubleClickFunc,
      autoSaveFunc: this.autoSaveFunc,
      cellCreatedFunc: this.cellCreatedFunc,
      deleteFunc: this.deleteFunc,
      undoFunc: this.undoFunc,
      copyFunc: this.copyFunc,
      valueChangeFunc: this.valueChangeFunc,
    });


    this.editorService.initCustomPort('https://gw.alicdn.com/tfs/TB1PqwZzzDpK1RjSZFrXXa78VXa-200-200.png');

    const xml = window.localStorage.getItem('autosaveXml');

    this.editorService.renderGraphFromXml(xml);
  }

  ngOnDestroy(){
    this.editor.removeEventListeners();
    //remove self from this group 
    this.editorHubService.removeFromGroup(this.mapId);
  }



  async getMingMap() {
    this.mapId = + this.route.snapshot.paramMap.get('id');
    const request = this.roomService.getMindMap(this.mapId);
    await request;
    var x = await request.subscribe((map: any) => {
      window.localStorage.setItem('autosaveXml', map.xmlText);
    })
    
  }
  

  doubleClickFunc = (cell) => {
    console.log('double click', cell);
  };

  cellCreatedFunc = (currentCell) => {
    const allCells = this.editor.getAllCells();

    let sameShapeNameCount = 0;
    const { shapeName } = currentCell;

    allCells
      && Object.keys(allCells).forEach((index) => {
        if (allCells[index].shapeName === shapeName) {
          sameShapeNameCount += 1;
        }
      });

    const labelName = currentCell.value;

    this.editor.renameCell(`${labelName}${sameShapeNameCount}`, currentCell);
  };

  deleteFunc = (cells) => {
    console.log('cells deleted: ', cells);
  };

  /**
   * value change callback
   * @param {*} cell cell
   * @param {*} newValue new value
   */
  valueChangeFunc = (cell, newValue) => {
    console.log(`new value: ${newValue}`);
  };

  autoSaveFunc = (xml) => {
    const oParser = new DOMParser ();
    const oDOM = oParser.parseFromString(xml, 'application/xml');

    this.editorHubService.sendGraph(this.mapId, xml);
    window.localStorage.setItem('autosaveXml', xml);
  };

  clickFunc = (cell) => {
    console.log('click', cell);
  };

  undoFunc = (histories) => {
    console.log('undo', histories);
  }

  copyFunc = (cells) => {
    console.log('copy', cells);
  }

  updateDiagramData = (data) => {
    console.log(`update diagram: ${data}`);
  }

}

