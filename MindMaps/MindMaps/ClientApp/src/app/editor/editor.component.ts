import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Editor from '../_config/editor-base';
import { EditorService } from '../_services/editor.service';
import { ServiceSignalR } from '../_services/ServiceSignalR';
import { UtilService } from '../_services/util.service';
// import util from 'mxgraph-editor/common/util';
// import factory from 'mxgraph';
// import Editor from 'mxgraph-editor';
// import Sidebar from 'mxgraph-editor';
// import Toolbar from 'mxgraph-editor';

// import IMAGE_SHAPES from 'mxgraph-editor/demo/shape-config/image-shape';
// import CARD_SHAPES from 'mxgraph-editor/demo/shape-config/card-shape';
// import SVG_SHAPES from 'mxgraph-editor/demo/shape-config/svg-shape.xml';

// declare var require: any;
// declare var mxEditor: any;
// declare var mxGraph: any;
// declare var mxPerimeter: any;
// declare var mxConstants: any;
// declare var mxHierarchicalLayout: any;

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

  constructor(
    // private utilService: UtilService,
    private editorService: EditorService,
    private signalRService: ServiceSignalR
    ) {
  }

  ngOnInit() {
    this.state = {
      editor: null
    };

    this.graphContainerClickCount = 0;

    // const options: any = {

    // }

    
    // const mx = factory({
    //   mxBasePath: '',
    // });
    // console.log(mx.mxClient.VERSION);
  
  }

  ngAfterViewInit() {
    // this.mounted = tr ue;
    
    this.editorService.init(
    // const editor = new Editor(
      // this.utilService,
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
      // IMAGE_SHAPES,
      // CARD_SHAPES,
      // SVG_SHAPES
    });

    // this.editor = editor;

    // window['editor'] = editor;

    this.editorService.initCustomPort('https://gw.alicdn.com/tfs/TB1PqwZzzDpK1RjSZFrXXa78VXa-200-200.png');

    const xml = window.localStorage.getItem('autosaveXml');

    this.editorService.renderGraphFromXml(xml);

    // this.state = { editor };
    
  }

  ngOnDestroy(){
    // this.mounted = false;
    this.editor.removeEventListeners();
  }
  // ngAfterViewInit() {
  //   // // const options: any = {
  //   // //   mxImageBasePath: "./src/images",
  //   // //   mxBasePath: "./src"
  //   // // }

  //   // // var mxgraph = require("mxgraph")(options);
  //   // // var mxEvent = mxgraph.mxEvent;
  //   // // mxEvent.disableContextMenu(this.graphContainer.nativeElement);
    

  //   // this.graph = new mxGraph(this.graphContainer.nativeElement);

  //   // // set default styles for graphconst style = this.graph.getStylesheet().getDefaultVertexStyle();
  //   // style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
  //   // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
  //   // style[mxConstants.DEFAULT_VALID_COLOR] = '#00FF00';
  //   // this.graph.getStylesheet().putDefaultVertexStyle (style);

  //   // // add cells
  //   // try {
  //   //   const parent = this.graph.getDefaultParent();
  //   //   this.graph.getModel().beginUpdate();
  //   //   const vertex1 = this.graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
  //   //   const vertex2 = this.graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
  //   //   this.graph.insertEdge(parent, '', '', vertex1, vertex2);
  //   // } finally {
  //   //   this.graph.getModel().endUpdate();
  //   //   new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
  //   // }
  //   // this.graph.gridSize = 30;
  //   // this.graph.setTooltips(true);

  //   // this.editor = new mxEditor({
  //   //   container: this.graph,
  //   //   clickFunc: this.clickFunc,
  //   //   doubleClickFunc: this.doubleClickFunc,
  //   //   autoSaveFunc: this.autoSaveFunc,
  //   //   cellCreatedFunc: this.cellCreatedFunc,
  //   //   deleteFunc: this.deleteFunc,
  //   //   valueChangeFunc: this.valueChangeFunc,
  //   //   // IMAGE_SHAPES,
  //   //   // CARD_SHAPES,
  //   //   // SVG_SHAPES
  //   // });
  // }

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
    // window.autosaveXml = xml;
// debugger;
    const oParser = new DOMParser (); // eslint-disable-line
    const oDOM = oParser.parseFromString(xml, 'application/xml');

    // window.autoSaveXmlDom = oDOM;
    this.signalRService.sendGraph(xml);
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

    // message.info('diagram save success');
  }

}


// declare class mxEditor {
//   init(config);
//   container;
//   clickFunc(cell);
//   doubleClickFunc(cell);
//   autoSaveFunc(xml);
//   cellCreatedFunc(currentCell);
//   deleteFunc(cells);
//   valueChangeFunc(cell, newValue);

//   getAllCells();
//   renameCell(name, currentCell);
//       // IMAGE_SHAPES,
//       // CARD_SHAPES,
//       // SVG_SHAPES
// }
