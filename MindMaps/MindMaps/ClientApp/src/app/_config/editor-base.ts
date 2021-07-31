// import '../resources/index';
import { UtilService } from '../_services/util.service';
// import util from '../common/util';

import { mxgraph, mxgraphFactory } from "ts-mxgraph";
const mx = mxgraphFactory({
  mxBasePath: 'mxgraph',
  mxLoadResources: false,
  mxLoadStylesheets: false,
  });


export default class Editor {
    containerEle: any;
    graph: any;
    cellCreatedFunc: any;
    valueChangeFunc: any;

  constructor(
      private util: UtilService,
      props) {
    this.init(props);
  }

  init(props) {
    const {
      container,
      cellCreatedFunc,
      valueChangeFunc,
    } = props;


    let containerEle;
    if (typeof container === 'string') {
      containerEle = document.querySelector(container);
    } else {
      containerEle = container;
    }

    const graph = new mxgraph.mxGraph(containerEle); // eslint-disable-line

    // Disables the built-in context menu
    mxgraph.mxEvent.disableContextMenu(containerEle); // eslint-disable-line
    mxgraph.mxVertexHandler.prototype.rotationEnabled = true; // eslint-disable-line

    this.containerEle = containerEle;

    this.initEditor({
      ...props,
      graph
    });

    this.graph = graph;
    this.cellCreatedFunc = cellCreatedFunc;
    this.valueChangeFunc = valueChangeFunc;
  }

  initEditor(config) { // eslint-disable-line
    const {
      graph,
      clickFunc,
      doubleClickFunc,
      autoSaveFunc,
      hoverFunc,
      deleteFunc,
      undoFunc,
      copyFunc,
      valueChangeFunc,
      changeFunc,
      // IMAGE_SHAPES,
      // CARD_SHAPES,
      // SVG_SHAPES
    } = config;

    graph.gridSize = 30;

    graph.setTooltips(true);

    // Disables the built-in context menu
    mxgraph.mxEvent.disableContextMenu(this.containerEle); // eslint-disable-line

    // Uncomment the following if you want the container
    // to fit the size of the graph
    // graph.setResizeContainer(true);

    this.util.initGraph({ graph });

    // util.initZoomConfig({ graph });

    // config shapes
    this.util.configShapes({
      graph,
      // IMAGE_SHAPES,
      // CARD_SHAPES,
      // SVG_SHAPES
    });

    // undo event listener
    this.util.undoListener({
      graph,
      callback: undoFunc
    });

    // copy event listener
    this.util.copyListener({
      graph,
      callback: copyFunc
    });

    // delete event listener
    this.util.deleteListener({
      graph,
      callback: deleteFunc,
    });

    // connector handler
    this.util.connectorHandler({
      graph,
    });

    this.util.handleDoubleClick({
      graph,
      callback: doubleClickFunc,
    });

    this.util.handleClick({
      graph,
      callback: clickFunc,
    });

    this.util.handleHover({
      graph,
      callback: hoverFunc,
    });

    this.util.handleChange({
      graph,
      callback: changeFunc,
    });

    this.util.initAutoSave({
      graph,
      callback: autoSaveFunc,
    });

    this.util.vertexRenameListener({
      callback: valueChangeFunc,
    });
  }

  // init sidebar
  initSidebar(sidebarItems) {
    return this.util.initSidebar({
      graph: this.graph,
      sidebarItems,
      cellCreatedFunc: this.cellCreatedFunc,
    });
  }

  // custom port, 10x10px
  initCustomPort(pic) {
    return this.util.initCustomPort({
      pic,
      graph: this.graph,
    });
  }

  /**
   * zoom
   * type: in、out、actual
   */
//TODO: zoom commented
  //   zoom(type) {
//     return this.util.zoom({
//       type,
//       graph: this.graph,
//     });
//   }


  /**
   * update style
   * @param {*} cell cell
   * @param {*} key the key of style
   * @param {*} value the value of style
   */
  updateStyle(cell, key, value) {
    return this.util.updateStyle(this.graph, cell, key, value);
  }

  groupCells(groupId, labelName) {
    const cellsGrouped = this.graph.getSelectionCells();

    const cell = this.graph.groupCells();
    cell.cellId = groupId;
    cell.value = labelName;
    cell.isGroupCell = true;

    cellsGrouped && cellsGrouped.forEach((item) => {
      item.isGrouped = true;
    });

    // util.updateStyle(this.graph, cell, 'strokeColor', 'none');
    this.util.updateStyle(this.graph, cell, 'fillColor', 'none');
    this.util.updateStyle(this.graph, cell, 'dashed', 1);
    this.util.updateStyle(this.graph, cell, 'verticalLabelPosition', 'bottom');
    this.util.updateStyle(this.graph, cell, 'verticalAlign', 'top');

    return { groupCell: cell, cellsGrouped };
  }

  handleUngroupCells(cells) {
    cells && cells.forEach((cell) => {
      if (cell.isGroupCell) {
        cell.isGroupCell = false;
      }

      cell.children && cell.children.forEach((child) => {
        child.isGrouped = false;
      });
    });

    return cells;
  }

  /**
   * ungroup cells
   */
  ungroupCells(cells) {
    const tempCells = cells || this.graph.getSelectionCells();

    const groupCells = [];

    tempCells && tempCells.forEach((cell) => {
      if (cell.isGroupCell) {
        groupCells.push(cell);
      }

      cell.children && cell.children.forEach((child) => {
        if (child.isGroupCell) {
          groupCells.push(child);
        }
      });

      const { parent } = cell;

      if (parent && parent.isGroupCell) {
        groupCells.push(parent);
      }
    });

    this.handleUngroupCells(groupCells);

    return this.graph.ungroupCells(groupCells);
  }

  // get all cells selected
  getCellsSelected() {
    return this.graph.getSelectionCells();
  }

  /**
   * render graph from xml
   * @param {string} xml xml
   */
  renderGraphFromXml(xml) {
    return this.util.renderGraphFromXml({
      graph: this.graph,
      xml,
    });
  }

  /**
   * get xml of the graph
   */
  getGraphXml() {
    const xml = this.util.getGraphXml({
      graph: this.graph,
    });

    const xmlStr = new XMLSerializer().serializeToString(xml); // eslint-disable-line

    return xmlStr;
  }

  /**
   * create vertex
   * @param {shapeLabel, x, y, width, height, shapeStyle} param0 shapeLabel, x, y, width, height, shapeStyle
   */
  createVertex(shapeLabel, x, y, width, height, shapeStyle) {
    const { graph } = this;

    const parent = graph.getDefaultParent();
    const cell = graph.insertVertex(parent, null, shapeLabel, x, y, width, height, shapeStyle);

    return cell;
  }

  /**
   * insert edge
   * @param {*} v1 cell 1
   * @param {*} v2 cell 2
   */
  insertEdge(v1, v2) {
    const parent = this.graph.getDefaultParent();

    return this.graph.insertEdge(parent, null, '', v1, v2);
  }

  /**
   * get cell by id
   * @param {*} id id
   */
  getCellById(id) {
    const { cells } = this.graph.model;

    let cell;

    cells && Object.keys(cells).forEach((key) => {
      if (cells[key].id === id) {
        cell = cells[key];
      }
    });

    return cell;
  }

  /**
   * get all cells
   */
  getAllCells() {
    const { cells } = this.graph.model;
    return cells;
  }


  removeEventListeners() {
    return this.util.removeEventListeners();
  }

  /**
   * rename a cell label
   * @param {*} newName new name
   * @param {*} cell a cell
   */
  renameCell(newName, cell) {
    return this.util.renameCell(newName, cell, this.graph);
  }

  /**
   * refresh the graph
   */
  refresh() {
    return this.graph.refresh();
  }

  /**
   * clear selection in the graph
   */
  clearSelection() {
    return this.graph.clearSelection();
  }

  startPanning() {
    return this.util.startPanning(this.graph);
  }

  stopPanning() {
    return this.util.stopPanning(this.graph);
  }
}
