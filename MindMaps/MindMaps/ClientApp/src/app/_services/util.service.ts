import { Injectable } from '@angular/core';
import GENERAL_SHAPES from '../_config/mx-general-shape';
import { mxgraph, mxgraphFactory } from "ts-mxgraph";
import { state } from '@angular/animations';
const mx = mxgraphFactory({
  mxBasePath: 'mxgraph',
  mxLoadResources: false,
  mxLoadStylesheets: false,
  });

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  undoListenerFunc2: any;
  copyListenerFunc2: any;
  deleteListenerFunc2: any;
  domNode: any;
  graph: any;
  model: any;
  
  constructor() { }


  initGraph(config) {
    const { graph } = config;

    // // Enables HTML labels
    // graph.setHtmlLabels(true);

    // Enables panning with left mouse button
    // graph.panningHandler.useLeftButtonForPanning = true;
    // graph.panningHandler.ignoreCell = true;
    // graph.container.style.cursor = 'move';
    graph.setPanning(true);

    // // Uncomment the following if you want the container
    // // to fit the size of the graph
    // graph.setResizeContainer(true);

    graph.collapsedImage = '';
    graph.expandedImage = '';

    graph.gridSize = 10;

    // Enables rubberband selection
    new mx.mxRubberband (graph); //eslint-disable-line
  }

  configShapes(config) {
    const {
      graph, IMAGE_SHAPES, CARD_SHAPES, SVG_SHAPES 
    } = config;

    const { stylesheet } = graph;
    const vertexStyle = stylesheet.getDefaultVertexStyle();
    vertexStyle[mx.mxConstants.STYLE_STROKECOLOR] = '#B9BECC'; //eslint-disable-line
    vertexStyle[mx.mxConstants.STYLE_FILLCOLOR] = '#ffffff'; //eslint-disable-line
    vertexStyle[mx.mxConstants.STYLE_FONTCOLOR] = '#333'; //eslint-disable-line
    const edgeStyle = stylesheet.getDefaultEdgeStyle();
    edgeStyle[mx.mxConstants.STYLE_STROKECOLOR] = '#B9BECC'; //eslint-disable-line
    edgeStyle[mx.mxConstants.STYLE_STROKEWIDTH] = 1; //eslint-disable-line
    edgeStyle[mx.mxConstants.STYLE_FONTCOLOR] = '#333'; //eslint-disable-line

    // const cardShapes = CARD_SHAPES || DEFAULT_CARD_SHAPES;
    // const imageShapes = IMAGE_SHAPES || DEFAULT_IMAGE_SHAPES;
    // const svgShapes = { custom: SVG_SHAPES, ...STENCILS };

    // this.imageShapes = imageShapes;

    graph.setDropEnabled(true);

    const imageStyle = {};
    // imageStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE; //eslint-disable-line
    imageStyle[mx.mxConstants.STYLE_PERIMETER] = mx.mxPerimeter.RectanglePerimeter; //eslint-disable-line
    // style[mxConstants.STYLE_IMAGE] = cardShapes[name];
    imageStyle[mx.mxConstants.STYLE_FONTCOLOR] = '#333'; //eslint-disable-line
    graph.getStylesheet().putCellStyle('image', imageStyle);

  }

  initSidebar(config) {
    const { graph, sidebarItems, cellCreatedFunc } = config;

    sidebarItems
      && sidebarItems.forEach((item) => {
        const width = item.getAttribute('data-shape-width');
        const height = item.getAttribute('data-shape-height');
        const shapeType = item.getAttribute('data-shape-type');
        const shapeName = item.getAttribute('data-shape-name');
        const shapeLabel = item.getAttribute('data-shape-label');
        const shapeContent = item.getAttribute('data-shape-content');
        let isEdge = false;

        let shapeStyle = shapeName;

        
        if (shapeType === 'general') {
          if (GENERAL_SHAPES[shapeName].type === 'edge') {
            isEdge = true;
          }
          shapeStyle = GENERAL_SHAPES[shapeName].style;
        
        }

        this.createDragableItem({
          id: `cell${Date.now()}`,
          node: item,
          width,
          height,
          shapeName,
          shapeLabel,
          shapeContent,
          graph,
          isEdge,
          shapeStyle,
          cellCreatedFunc,
        });
      });
  }

  createDragableItem(config) {
    const {
      graph,
      node,
      shapeName,
      shapeStyle,
      shapeLabel,
      // shapeContent,
      id,
      isEdge,
      cellCreatedFunc,
    } = config;

    let { width, height } = config;

    width = width * 1 || 130;
    height = height * 1 || 90;

    // Returns the graph under the mouse
    const graphF = (evt) => {
      const x = mx.mxEvent.getClientX (evt); //eslint-disable-line
      const y = mx.mxEvent.getClientY (evt); //eslint-disable-line
      const elt = document.elementFromPoint(x, y);

      if (mx.mxUtils.isAncestorNode(graph.container, elt)) {  //eslint-disable-line
        //eslint-disable-line
        return graph;
      }

      return null;
    };

  //   // Inserts a cell at the given location
    const funct = (graph2, evt, target, x, y) => {
      try {
        // is a edge
        if (isEdge) {
          const cell: mxgraph.mxCell = new mx.mxCell(  //eslint-disable-line
            '',
            new mx.mxGeometry(0, 0, width, height),  //eslint-disable-line
            shapeStyle
          ); //eslint-disable-line
          cell.geometry.setTerminalPoint (new mxPoint (0, height), true); //eslint-disable-line
          cell.geometry.setTerminalPoint (new mxPoint (width, 0), false); //eslint-disable-line
          // cell.geometry.points = [new mxPoint(width/2, height/2), new mxPoint(0, 0)];
          cell.geometry.relative = true;
          cell.edge = true;
          // cell.shapeName = shapeName; TODO: CHECK IF WE NEED THIS
          cell.id = id;

          const cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells.length > 0) {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }

          cellCreatedFunc && cellCreatedFunc(cell);
        } else {
          const parent = graph.getDefaultParent();

          if (parent) {
            const cell = graph.insertVertex(
              parent,
              id,
              shapeLabel,
              x,
              y,
              width,
              height,
              shapeStyle
            );
            cell.shapeName = shapeName;

            cellCreatedFunc && cellCreatedFunc(cell);
          } else {
            console.log('graph.getDefaultParent() 为 null');
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

  //   // Disables built-in DnD in IE (this is needed for cross-frame DnD, see below)
    if (mx.mxClient.IS_IE) {  //eslint-disable-line
      //eslint-disable-line
      mx.mxEvent.addListener(node, 'dragstart', (evt) => {  //eslint-disable-line
        //eslint-disable-line
        evt.returnValue = false;
      });
    }

    // Creates the element that is being for the actual preview.
    const dragElt = document.createElement('div');
    dragElt.style.border = 'dashed black 1px';
    dragElt.style.width = `${width}px`;
    dragElt.style.height = `${height}px`;

    // Drag source is configured to use dragElt for preview and as drag icon
    // if scalePreview (last) argument is true. Dx and dy are null to force
    // the use of the defaults. Note that dx and dy are only used for the
    // drag icon but not for the preview.
    const ds = mx.mxUtils.makeDraggable(  //eslint-disable-line
      //eslint-disable-line
      node,
      graphF,
      funct,
      dragElt,
      null,
      null,
      graph.autoscroll,
      true
    );

    // Redirects feature to global switch. Note that this feature should only be used
    // if the the x and y arguments are used in funct to insert the cell.
    ds.isGuidesEnabled = () => graph.graphHandler.guidesEnabled;

    // Restores original drag icon while outside of graph
    ds.createDragElement = mx.mxDragSource.prototype.createDragElement; //eslint-disable-line
  }

  undoListener(config) {
    const { graph, callback } = config;

    // Undo/redo
    
    const undoManager: mxgraph.mxUndoManager = new mx.mxUndoManager (10); //eslint-disable-line

    graph.undoManager = undoManager;

    const listener = (sender, evt) => {
      undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel ().addListener (mx.mxEvent.UNDO, listener); //eslint-disable-line
    graph.getView ().addListener (mx.mxEvent.UNDO, listener); //eslint-disable-line

    this.undoListenerFunc2 = this.undoListenerFunc.bind(this, undoManager, callback);

    document.body.addEventListener('keydown', this.undoListenerFunc2);
  }

  undoListenerFunc(undoManager, callback, e) {
    if (e.target !== e.currentTarget) {
      return false;
    }

    const evtobj = window.event ? window.event : e;

    if (evtobj.keyCode === 90 && (evtobj.ctrlKey || evtobj.metaKey)) {
      undoManager.undo();

      const { history: histories } = undoManager;

      callback && callback(histories);
      
      // undoManager.redo();
    }
  }

  copyListener(config) {
    const { graph, callback } = config;

    this.copyListenerFunc2 = this.copyListenerFunc.bind(this, graph, callback);
    document.body.addEventListener('keydown', this.copyListenerFunc2);
  }

  copyListenerFunc(graph, callback, e) {
    if (e.target !== e.currentTarget) {
      return false;
    }

    const evtobj = window.event ? window.event : e;
    // command + c / ctrl + c
    if (evtobj.keyCode === 67 && (evtobj.ctrlKey || evtobj.metaKey)) {
      // mxgraph.mxClipboard.copy(graph, null); //eslint-disable-line // TODO: check this null
    } else if (evtobj.keyCode === 86 && (evtobj.ctrlKey || evtobj.metaKey)) { // command + v / ctrl + v
        
      const cells = mx.mxClipboard.paste(graph); // eslint-disable-line

      callback && callback(cells);
    }
  }

  deleteListener(config) {
    const { graph, callback } = config;

    const { removeCells } = graph;
    graph.removeCells = function (cells) {
      const result = removeCells.apply(this, [cells]);
      callback && callback(cells);
      return result;
    };

    this.deleteListenerFunc2 = this.deleteListenerFunc.bind(this, graph);

    document.body.addEventListener('keydown', this.deleteListenerFunc2);
  }

  deleteListenerFunc(graph, e) {
    if (
      !(e.target === e.currentTarget || graph.container.contains(e.target))
    ) {
      return false;
    }

    const { editingCell } = graph.cellEditor;

    const evtobj = window.event ? window.event : e;
    if (evtobj.keyCode === 46 || evtobj.keyCode === 8) {

      if (!editingCell) {
        const cellsSelected = graph.getSelectionCells();
        // cellsSelected && cellsSelected.length && graph.removeCells(cellsSelected);

        const cellsSelectable = [];
        cellsSelected
          && cellsSelected.forEach((cell) => {
            if (!cell.disabled) {
              cellsSelectable.push(cell);
            }
          });

        cellsSelectable
          && cellsSelectable.length
          && graph.removeCells(cellsSelectable);
      }
    }
  }

  connectorHandler(config) {
    const { graph } = config;

    graph.setConnectable(true);
    mx.mxGraphHandler.prototype.guidesEnabled = true; //eslint-disable-line

    // Disables automatic handling of ports. This disables the reset of the
    // respective style in mxGraph.cellConnected. Note that this feature may
    // be useful if floating and fixed connections are combined.
    graph.setPortsEnabled(false);

    // Disables floating connections (only connections via ports allowed)
    graph.connectionHandler.isConnectableCell = function (cell) {  //eslint-disable-line
      //eslint-disable-line
      return false;
    };

    mx.mxEdgeHandler.prototype.isConnectableCell = function (cell) {  //eslint-disable-line
      //eslint-disable-line
      return graph.connectionHandler.isConnectableCell(cell);
    };

    // Overridden to define per-shape connection points
    mx.mxGraph.prototype.getAllConnectionConstraints = function (  //eslint-disable-line
      terminal,
      source  //eslint-disable-line
    ) {
      //eslint-disable-line
      // if (terminal && terminal.shape && terminal.shape.constraints) {
      //   return terminal.shape.constraints;
      // }

      // return null;

      const { cell } = terminal;
      const { pointType } = cell;

      if (cell.disabled) {
        return [];
      }

      let points = [];

      switch (pointType) {
        case 'top':
          points = [
            new mx.mxConnectionConstraint (new mxPoint (0.5, 0), true), //eslint-disable-line
          ];
          break;
        case 'left':
          points = [
            new mx.mxConnectionConstraint (new mxPoint (0, 0.5), true), //eslint-disable-line
          ];
          break;
        case 'right':
          points = [
            new mx.mxConnectionConstraint (new mxPoint (1, 0.5), true), //eslint-disable-line
          ];
          break;
        case 'bottom':
          points = [
            new mx.mxConnectionConstraint (new mxPoint (0.5, 1), true), //eslint-disable-line
          ];
          break;
        case 'none':
          points = [];
          break;
        default:
          points = [
            new mx.mxConnectionConstraint (new mxPoint (0.25, 0), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0.5, 0), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0.75, 0), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0, 0.25), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0, 0.5), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0, 0.75), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (1, 0.25), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (1, 0.5), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (1, 0.75), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0.25, 1), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0.5, 1), true), //eslint-disable-line
            new mx.mxConnectionConstraint (new mxPoint (0.75, 1), true), //eslint-disable-line
          ];
          break;
      }

      return points;
    };

    // Defines the default constraints for all shapes
    // mxgraph.mxShape.prototype.constraints = [  //eslint-disable-line
    //   //eslint-disable-line
    //   // new mxConnectionConstraint(new mxPoint(0.25, 0), true),
    //   new mxgraph.mxConnectionConstraint (new mxPoint (0.5, 0), true), //eslint-disable-line
    //   // new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    //   // new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    //   new mxgraph.mxConnectionConstraint (new mxPoint (0, 0.5), true), //eslint-disable-line
    //   // new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    //   // new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    //   new mxgraph.mxConnectionConstraint (new mxPoint (1, 0.5), true), //eslint-disable-line
    //   // new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    //   // new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    //   new mxgraph.mxConnectionConstraint (new mxPoint (0.5, 1), true), //eslint-disable-line
    //   // new mxConnectionConstraint(new mxPoint(0.75, 1), true)
    // ];

    // // Edges have no connection points
    // mxgraph.mxPolyline.prototype.constraints = null; //eslint-disable-line

    // Enables connect preview for the default edge style
    graph.connectionHandler.createEdgeState = () => {
      const edge = graph.createEdge(null, null, null, null, null);

      return new mx.mxCellState (graph.view, edge, graph.getCellStyle (edge)); //eslint-disable-line
    };

    // Changes the default style for edges "in-place" and assigns
    // an alternate edge style which is applied in mxGraph.flip
    // when the user double clicks on the adjustment control point
    // of the edge. The ElbowConnector edge style switches to TopToBottom
    // if the horizontal style is true.
    const style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mx.mxConstants.STYLE_ROUNDED] = true; //eslint-disable-line
    // style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector; // 备选：orthogonalEdgeStyle
    style[mx.mxConstants.STYLE_EDGE] = 'orthogonalEdgeStyle'; //eslint-disable-line
    // style[mxConstants.STYLE_STROKEWIDTH] = 1;

    // graph.alternateEdgeStyle = 'elbow=vertical';

    // Snaps to fixed points
    mx.mxConstraintHandler.prototype.intersects = function (  //eslint-disable-line
      icon,
      point,
      source,
      existingEdge
    ) {
      //eslint-disable-line
      return !source || existingEdge || mx.mxUtils.intersects (icon.bounds, point); //eslint-disable-line
    };
  }

    popmenu
  initPopupMenu(config) {
    const { graph } = config;

    // Installs a popupmenu handler using local function (see below).
    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) =>
      createPopupMenu (graph, menu, cell, evt); //eslint-disable-line

    // Function to create the entries in the popupmenu
    function createPopupMenu(graph, menu, cell, evt) {  //eslint-disable-line
      //eslint-disable-line
      if (cell != null) {
        menu.addItem(
          'Cell Item',
          'https://img.alicdn.com/tfs/TB1xSANXXzqK1RjSZFvXXcB7VXa-22-22.png',
          () => {
            mx.mxUtils.alert ('MenuItem1'); //eslint-disable-line
          }
        );
      } else {
        menu.addItem(
          'No-Cell Item',
          'https://img.alicdn.com/tfs/TB1CFkNXmzqK1RjSZPxXXc4tVXa-22-22.png',
          () => {
            mx.mxUtils.alert ('MenuItem2'); //eslint-disable-line
          }
        );
      }
      menu.addSeparator();
      menu.addItem(
        'MenuItem3',
        'https://img.alicdn.com/tfs/TB1CFkNXmzqK1RjSZPxXXc4tVXa-22-22.png',
        () => {
          mx.mxUtils.alert (`MenuItem3: ${graph.getSelectionCount ()} selected`); //eslint-disable-line
        }
      );
    }
  }

  // init VertexToolHandler
  initVertexToolHandler(config) {
    const { graph } = config;

    // Defines a subclass for mxVertexHandler that adds a set of clickable
    // icons to every selected vertex.
    function mxVertexToolHandler(state) {  //eslint-disable-line
      //eslint-disable-line
      mx.mxVertexHandler.apply (this, arguments); //eslint-disable-line
    }

    mxVertexToolHandler.prototype = new mx.mxVertexHandler (state); //TODO state added, but what is it //eslint-disable-line
    mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

    // mxVertexToolHandler.prototype.domNode = null; // TODO was not comented

    mxVertexToolHandler.prototype.init = () => {
      mx.mxVertexHandler.prototype.init.apply (this, arguments); //eslint-disable-line

      // In this example we force the use of DIVs for images in IE. This
      // handles transparency in PNG images properly in IE and fixes the
      // problem that IE routes all mouse events for a gesture via the
      // initial IMG node, which means the target vertices
      this.domNode = document.createElement('div');
      this.domNode.style.position = 'absolute';
      this.domNode.style.whiteSpace = 'nowrap';

      // Workaround for event redirection via image tag in quirks and IE8
      function createImage(src) {
        if (mx.mxClient.IS_IE && !mx.mxClient.IS_SVG) {  //eslint-disable-line
          //eslint-disable-line
          const img = document.createElement('div');
          img.style.backgroundImage = `url(${src})`;
          img.style.backgroundPosition = 'center';
          img.style.backgroundRepeat = 'no-repeat';
          img.style.display = mx.mxClient.IS_QUIRKS ? 'inline' : 'inline-block'; //eslint-disable-line

          return img;
        }
        return mx.mxUtils.createImage (src); //eslint-disable-line
      }

      // Delete
      let img = createImage(
        'https://img.alicdn.com/tfs/TB1Z.ETXbvpK1RjSZPiXXbmwXXa-22-22.png'
      ); //eslint-disable-line
      img.setAttribute('title', 'Delete');
      img.style.cursor = 'pointer';
      img.style.width = '16px';
      img.style.height = '16px';
      mx.mxEvent.addGestureListeners(  //eslint-disable-line
        img, //eslint-disable-line
        mxgraph.mxUtils.bind(this, (evt) => {  //eslint-disable-line
          //eslint-disable-line
          // Disables dragging the image
          mxgraph.mxEvent.consume (evt); //eslint-disable-line
        }),
        null,
        null
      );
      mx.mxEvent.addListener(  //eslint-disable-line
        img,
        'click', //eslint-disable-line
        mx.mxUtils.bind(this, function (evt) {  //eslint-disable-line
          //eslint-disable-line
          this.graph.removeCells([this.state.cell]);
          mx.mxEvent.consume (evt); //eslint-disable-line
        })
      );
      this.domNode.appendChild(img);

      // // Size
      // var img = createImage('https://img.alicdn.com/tfs/TB1aucUXhTpK1RjSZR0XXbEwXXa-22-22.png');
      // img.setAttribute('title', 'Resize');
      // img.style.cursor = 'se-resize';
      // img.style.width = '16px';
      // img.style.height = '16px';
      // mxEvent.addGestureListeners(img,
      //   mxUtils.bind(this, function (evt) {
      //     this.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
      //     this.graph.isMouseDown = true;
      //     this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
      //     mxEvent.consume(evt);
      //   })
      // );
      // this.domNode.appendChild(img);

      // Move
      img = createImage(
        'https://img.alicdn.com/tfs/TB1inERXmrqK1RjSZK9XXXyypXa-22-22.png'
      ); //eslint-disable-line
      img.setAttribute('title', 'Move');
      img.style.cursor = 'move';
      img.style.width = '16px';
      img.style.height = '16px';
      mx.mxEvent.addGestureListeners(  //eslint-disable-line
        img, //eslint-disable-line
        mx.mxUtils.bind(this, function (evt) {  //eslint-disable-line
          //eslint-disable-line
          this.graph.graphHandler.start(
            this.state.cell,
            mx.mxEvent.getClientX(evt),  //eslint-disable-line
            mx.mxEvent.getClientY(evt)  //eslint-disable-line
          ); //eslint-disable-line
          this.graph.graphHandler.cellWasClicked = true;
          this.graph.isMouseDown = true;
          this.graph.isMouseTrigger = mx.mxEvent.isMouseEvent (evt); //eslint-disable-line
          mx.mxEvent.consume (evt); //eslint-disable-line
        }),
        null,
        null
      );
      this.domNode.appendChild(img);

      // Connect
      img = createImage(
        'https://img.alicdn.com/tfs/TB1xDQSXgHqK1RjSZFkXXX.WFXa-22-22.png'
      ); //eslint-disable-line
      img.setAttribute('title', 'Connect');
      img.style.cursor = 'pointer';
      img.style.width = '16px';
      img.style.height = '16px';
      mx.mxEvent.addGestureListeners(  //eslint-disable-line
        img, //eslint-disable-line
        mx.mxUtils.bind(this, function (evt) {  //eslint-disable-line
          //eslint-disable-line
          const pt = mx.mxUtils.convertPoint(  //eslint-disable-line
            this.graph.container, //eslint-disable-line
            mx.mxEvent.getClientX(evt),  //eslint-disable-line
            mx.mxEvent.getClientY(evt)  //eslint-disable-line
          ); //eslint-disable-line
          this.graph.connectionHandler.start(this.state, pt.x, pt.y);
          this.graph.isMouseDown = true;
          this.graph.isMouseTrigger = mx.mxEvent.isMouseEvent (evt); //eslint-disable-line
          mx.mxEvent.consume (evt); //eslint-disable-line
        }),
        null,
        null
      );
      this.domNode.appendChild(img);

      this.graph.container.appendChild(this.domNode);
      // this.redrawTools();
    };

    mxVertexToolHandler.prototype.redraw = () => {
      mx.mxVertexHandler.prototype.redraw.apply (this); //eslint-disable-line
      // this.redrawTools();
    };

    // mxVertexToolHandler.prototype.redrawTools = () => {
    //   if (this.state != null && this.domNode != null) {
    //     const dy = mxgraph.mxClient.IS_VML && document.compatMode === 'CSS1Compat'  //eslint-disable-line
    //       ? 20
    //       : 4; //eslint-disable-line
    //     this.domNode.style.left = `${this.state.x + this.state.width - 56}px`;
    //     this.domNode.style.top = `${this.state.y - dy - 26}px`;
    //   }
    // };

    mxVertexToolHandler.prototype.destroy = function () {//TODO (sender, me) was in   //eslint-disable-line
      //eslint-disable-line
      mx.mxVertexHandler.prototype.destroy.apply (this, arguments); //eslint-disable-line

      if (this.domNode != null) {
        this.domNode.parentNode.removeChild(this.domNode);
        this.domNode = null;
      }
    };

    graph.connectionHandler.createTarget = true;

    graph.createHandler = (state) => {
      if (state != null && this.model.isVertex(state.cell)) {
        return new mxVertexToolHandler (state); //eslint-disable-line
      }

      return mx.mxGraph.prototype.createHandler.apply (this, arguments); //eslint-disable-line
    };
  }

  handleDoubleClick(config) {
    const { graph, callback } = config;

    // Installs a handler for double click events in the graph
    // that shows an alert box
    graph.addListener(mx.mxEvent.DOUBLE_CLICK, (sender, evt) => {  //eslint-disable-line
      //eslint-disable-line
      const cell = evt.getProperty('cell');

      callback && callback(cell);

      // evt.consume();
    });
  }

  handleClick(config) {
    const { graph, callback } = config;

    graph.addListener(mx.mxEvent.CLICK, (sender, evt) => {  //eslint-disable-line
      //eslint-disable-line
      const cell = evt.getProperty('cell');

      callback && callback(cell, evt);

      // // 如果没有点中 cell，清空 cell 选择
      // if (!cell) {
      //   sender.selectionModel.clear();
      // }

      // evt.consume();
    });

    // graph.addListener(mxEvent.MOVE_CELLS, (sender, evt) => {
    //   const cell = evt.getProperty('cell');

    //   console.log('move', evt, sender);

    //   // callback && callback(cell);

    //   // // 如果没有点中 cell，清空 cell 选择
    //   // if (!cell) {
    //   //   sender.selectionModel.clear();
    //   // }

    //   // evt.consume();
    // });
  }

  handleChange(config) {
    const { graph, callback } = config;

    graph.getSelectionModel().addListener(mx.mxEvent.CHANGE, (sender, evt) => {  //eslint-disable-line
      //eslint-disable-line
      // console.log('change', sender, evt);

      callback && callback();
    });
  }

  handleHover(config) {
    const { graph, callback } = config;

    // Defines an icon for creating new connections in the connection handler.
    // This will automatically disable the highlighting of the source vertex.
    mx.mxConnectionHandler.prototype.connectImage = new mxImage(  //eslint-disable-line
      'images/connector.gif',
      16,
      16
    ); //eslint-disable-line

    // Defines a new class for all icons
    function mxIconSet(state) {
      this.images = [];
      const {
        graph, //eslint-disable-line
      } = state.view;

      // // pen
      // var img = mxUtils.createImage('https://img.alicdn.com/tfs/TB1lOfwbPTpK1RjSZKPXXa3UpXa-22-22.png');
      // img.setAttribute('title', 'Duplicate');
      // img.style.position = 'absolute';
      // img.style.cursor = 'pointer';
      // img.style.width = '16px';
      // img.style.height = '16px';
      // img.style.left = (state.x + state.width) + 'px';
      // img.style.top = (state.y + 10) + 'px';

      // mxEvent.addGestureListeners(img,
      //   mxUtils.bind(this, function (evt) {
      //     var s = graph.gridSize;
      //     // graph.setSelectionCells(graph.moveCells([state.cell], s, s, true));

      //     // graph.model.setValue(state.cell, 'newlabel222');

      //     // 开启 label 可编辑状态
      //     graph.startEditingAtCell(state.cell);

      //     // 自动聚焦到 label 编辑文本
      //     state.shape.node.focus();

      //     mxEvent.consume(evt);
      //     this.destroy();
      //   })
      // );

      // state.view.graph.container.appendChild(img);
      // this.images.push(img);

      // Delete
      const img = mx.mxUtils.createImage(  //eslint-disable-line
        'https://img.alicdn.com/tfs/TB1nt90dgHqK1RjSZFkXXX.WFXa-32-32.png'
      ); //eslint-disable-line
      img.setAttribute('title', 'Delete');
      img.style.position = 'absolute';
      img.style.cursor = 'pointer';
      img.style.width = '16px';
      img.style.height = '16px';
      img.style.left = `${state.x + state.width}px`;
      img.style.top = `${state.y - 16}px`;

      mx.mxEvent.addGestureListeners(  //eslint-disable-line
        img, //eslint-disable-line
        mx.mxUtils.bind(this, (evt) => {  //eslint-disable-line
          //eslint-disable-line
          // Disables dragging the image
          mx.mxEvent.consume (evt); //eslint-disable-line
        }),
        null,
        null
      );

      mx.mxEvent.addListener(  //eslint-disable-line
        img,
        'click', //eslint-disable-line
        mx.mxUtils.bind(this, function (evt) {  //eslint-disable-line
          //eslint-disable-line
          graph.removeCells([state.cell]);
          mx.mxEvent.consume (evt); //eslint-disable-line
          this.destroy();
        })
      );

      state.view.graph.container.appendChild(img);
      this.images.push(img);
    }

    mxIconSet.prototype.destroy = function () {
      if (this.images != null) {
        for (let i = 0; i < this.images.length; i += 1) {
          const img = this.images[i];
          img.parentNode.removeChild(img);
        }
      }

      this.images = null;
    };

    // Defines the tolerance before removing the icons
    const iconTolerance = 20;

    // Shows icons if the mouse is over a cell
    graph.addMouseListener({
      currentState: null,
      currentIconSet: null,
      mouseDown(sender, me) {
        // Hides icons on mouse down
        if (this.currentState != null) {
          this.dragLeave(me.getEvent(), this.currentState);
          this.currentState = null;
        }
      },
      mouseMove(sender, me) {
        let tmp;

        if (
          this.currentState != null
          && (me.getState() === this.currentState || me.getState() == null)
        ) {
          const tol = iconTolerance;
          tmp = new mx.mxRectangle(  //eslint-disable-line
            me.getGraphX () - tol, //eslint-disable-line
            me.getGraphY() - tol,
            2 * tol,
            2 * tol
          );

          if (mx.mxUtils.intersects(tmp, this.currentState)) {  //eslint-disable-line
            //eslint-disable-line
            return;
          }
        }

        tmp = graph.view.getState(me.getCell());

        // Ignores everything but vertices
        if (
          graph.isMouseDown
          || (tmp != null && !graph.getModel().isVertex(tmp.cell))
        ) {
          tmp = null;
        }

        if (tmp !== this.currentState) {
          if (this.currentState != null) {
            this.dragLeave(me.getEvent(), this.currentState);
          }

          this.currentState = tmp;

          if (this.currentState != null) {
            this.dragEnter(me.getEvent(), this.currentState);
          }
        }
      },
      mouseUp (sender, me) {}, //eslint-disable-line
      dragEnter(evt, state) {
        const { cell } = state;
        const { disabled } = cell;

        if (this.currentIconSet === null && !disabled) {
          this.currentIconSet = new mxIconSet (state); //eslint-disable-line
        }

        callback && callback(evt, state);
      },
      dragLeave(evt, state) {  //eslint-disable-line
        //eslint-disable-line
        if (this.currentIconSet != null) {
          this.currentIconSet.destroy();
          this.currentIconSet = null;
        }
      },
    });
  }

  htmlLable(config) {
    const { graph } = config;

    // Enables HTML labels
    graph.setHtmlLabels(true);

    // Creates a user object that stores the state
    const doc = mx.mxUtils.createXmlDocument (); //eslint-disable-line
    const obj = doc.createElement('UserObject');
    obj.setAttribute('label', 'Hello, World!');
    obj.setAttribute('checked', 'false');
  }

  initAutoSave(config) {
    const { graph, callback } = config;

    const mgr: mxgraph.mxAutoSaveManager = new mx.mxAutoSaveManager (graph); //eslint-disable-line
    ///mgr.autoSaveDelay = 0; // 自动保存延迟时间设为0       // TODO: was not commented
    mgr.save = () => {
      const xml = this.getGraphXml({
        graph,
      });

      const formatedNode = this.formatXmlNode(xml);

      if (!formatedNode) {
        return false;
      }

      const xmlStr = new XMLSerializer ().serializeToString (formatedNode); //eslint-disable-line

      graph.xmlStr = xmlStr;

      callback && callback(xmlStr);
    };
  }

  // check the xmlnode format to avoid error
  formatXmlNode(xmlNode) {
    const rootEle = xmlNode && xmlNode.firstElementChild;
    
    let hasRoot = false;
    if (rootEle && rootEle.tagName === 'root') {
      hasRoot = true;
    }

    let hasIdO = false;
    if (rootEle && rootEle.firstElementChild && rootEle.firstElementChild.id === '0') {
      hasIdO = true;
    }

    if (!(hasRoot && hasIdO)) {
      console.warn('xmlNode must have root node');
      // return false;
    }

    const elements: Array<HTMLElement> = rootEle.children;      /// ADD : Array<HTMLElement>

    const idsArr = [];

    elements && Array.from(elements).forEach((element) => {
      const cellId = element && element.getAttribute('id');

      if (idsArr.indexOf(cellId) === -1) {
        idsArr.push(cellId);
      } else {
        console.warn('cell id is duplicated, delete the needless one', element);
        rootEle.removeChild(element);
      }

      if (element && element.getAttribute('vertex') === '1' && element.getAttribute('edge') === '1') {
        console.warn('cell\'s property vertex and edge cannot both be 1, set property edge to 0', element);
        element.setAttribute('edge', '0');
      }
    });

    return xmlNode;
  }

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(config) {
    // debugger;
    let { ignoreSelection } = config;
    const { graph } = config;

    ignoreSelection = ignoreSelection != null ? ignoreSelection : true;
    let node = null;

    if (ignoreSelection) {
      const enc: mxgraph.mxCodec = new mx.mxCodec(mxgraph.mxUtils.createXmlDocument ()); //eslint-disable-line
      node = enc.encode(graph.getModel());
    } else {
      node = graph.encodeCells(
        mx.mxUtils.sortCells(  //eslint-disable-line
          graph.model.getTopmostCells(
            //eslint-disable-line
            graph.getSelectionCells()
          )
        )
      );
    }

    if (graph.view.translate.x !== 0 || graph.view.translate.y !== 0) {
      node.setAttribute('dx', Math.round(graph.view.translate.x * 100) / 100);
      node.setAttribute('dy', Math.round(graph.view.translate.y * 100) / 100);
    }

    node.setAttribute('grid', graph.isGridEnabled() ? '1' : '0');
    node.setAttribute('gridSize', graph.gridSize);
    node.setAttribute('guides', graph.graphHandler.guidesEnabled ? '1' : '0');
    node.setAttribute(
      'tooltips',
      graph.tooltipHandler.isEnabled() ? '1' : '0'
    );
    node.setAttribute(
      'connect',
      graph.connectionHandler.isEnabled() ? '1' : '0'
    );
    node.setAttribute('arrows', graph.connectionArrowsEnabled ? '1' : '0');
    node.setAttribute('fold', graph.foldingEnabled ? '1' : '0');
    node.setAttribute('page', graph.pageVisible ? '1' : '0');
    node.setAttribute('pageScale', graph.pageScale);
    node.setAttribute('pageWidth', graph.pageFormat.width);
    node.setAttribute('pageHeight', graph.pageFormat.height);

    if (graph.background != null) {
      node.setAttribute('background', graph.background);
    }

    return node;
  }

  // 从 xml 渲染 graph
  renderGraphFromXml(config) {
    // debugger;
    const { graph, xml } = config;

    // const xml = window.localStorage.getItem('graph-xml');
    const xmlDocument = mx.mxUtils.parseXml (xml); //eslint-disable-line

    if (
      xmlDocument.documentElement != null
      && xmlDocument.documentElement.nodeName === 'mxGraphModel'
    ) {
      const decoder: mxgraph.mxCodec = new mx.mxCodec (xmlDocument); //eslint-disable-line
      const node = xmlDocument.documentElement;

      const formatedNode = this.formatXmlNode(node);

      if (!formatedNode) {
        return false;
      }

      decoder.decode(formatedNode, graph.getModel());
    }
  }

  // 自定义锚点
  initCustomPort(config) {
    const { pic } = config;
    // Replaces the port image
    mx.mxConstraintHandler.prototype.pointImage = new mx.mxImage (pic, 10, 10); //eslint-disable-line
  }

  /**
   * 初始化缩放配置
   */
  // initZoomConfig(config) {
  //   const { graph } = config;
  //   graph.keepSelectionVisibleOnZoom = true;
  //   graph.centerZoom = true;
  // },

  // // 缩放
  // zoom(config) {
  //   const { graph, type } = config;

  //   switch (type) {
  //     case 'in':
  //       graph.zoomIn();
  //       break;
  //     case 'out':
  //       graph.zoomOut();
  //       break;
  //     case 'actual':
  //       graph.zoomActual();
  //       break;
  //     default:
  //       break;
  //   }

  //   const cellsSelected = graph.getSelectionCells();
  //   graph.scrollCellToVisible(cellsSelected, true);
  //   graph.refresh();
  // },

  updateStyle(graph, cell, key, value) {
    const model = graph.getModel();

    model.beginUpdate();

    let newStyle = model.getStyle(cell);

    newStyle = mx.mxUtils.setStyle (newStyle, key, value); //eslint-disable-line

    model.setStyle(cell, newStyle);

    model.endUpdate();
  }

  /**
   * 节点重命名监听器
   */
  vertexRenameListener({ callback }) {
    // mxgraph.mxCell.prototype.valueChangedCallback = callback; //eslint-disable-line

    // // 若没重写过 valueChanged 方法则重写
    // if (!mxgraph.mxCell.prototype.hasRewriteValueChanged) {  //eslint-disable-line
    //   //eslint-disable-line
    //   mxgraph.mxCell.prototype.hasRewriteValueChanged = true; //eslint-disable-line

    //   const { valueChanged } = mxgraph.mxCell.prototype; //eslint-disable-line
    //   mxgraph.mxCell.prototype.valueChanged = function (newValue) {  //eslint-disable-line
    //     //eslint-disable-line
    //     const { valueChangedCallback } = mxgraph.mxCell.prototype; //eslint-disable-line

    //     valueChangedCallback && valueChangedCallback(this, newValue);
    //     valueChanged.apply(this, [newValue]);
    //   };
    // }
  }

  /**
   * 重命名一个cell
   * @param {*} newName 新名字（labelName）
   * @param {*} cell cell
   * @param {*} graph cell 归属的 graph
   */
  renameCell(newName, cell, graph) {
    cell.value = newName;
    graph.refresh(); // 重新渲染graph
  }

  /**
   * remove event listeners
   */
  removeEventListeners() {
    document.body.removeEventListener('keydown', this.undoListenerFunc2);
    document.body.removeEventListener('keydown', this.copyListenerFunc2);
    document.body.removeEventListener('keydown', this.deleteListenerFunc2);
  }

  startPanning(graph) {
    debugger;
    // graph.setPanning(true);
    // Enables panning with left mouse button
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.panningHandler.ignoreCell = true;
    graph.container.style.cursor = 'move';
  }

  stopPanning(graph) {
    graph.panningHandler.useLeftButtonForPanning = false;
    graph.panningHandler.ignoreCell = false;
    graph.container.style.cursor = 'auto';
  }

  findItemFromArray(arr, query) {
    const key = Object.keys(query)[0];
    const value = query[key];

    let result;

    arr && arr.forEach((item) => {
      if (item && item[key] === value) {
        result = item;
      }
    });

    return result;
  }
}
