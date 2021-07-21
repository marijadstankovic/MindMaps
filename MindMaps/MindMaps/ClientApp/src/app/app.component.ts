import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ServiceSignalR } from './_services/ServiceSignalR';
import { AuthService } from './_services/auth.service';
import * as mx from 'mxgraph';
//declare var mxGraph: any;
//declare var mxHierarchicalLayout: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;

  constructor(private authService: AuthService, private serviceSignalR: ServiceSignalR) {
    if (typeof (mx.mxLoadResources) == 'undefined') {
      console.log("Text");
    }

  }
  ngAfterViewInit(): void {
    const graph: mx.mxGraph = new mx.mxGraph(this.graphContainer.nativeElement);
    const model: mx.mxGraphModel = graph.getModel();
    model.beginUpdate();
    try {
      var v1 = graph.insertVertex(graph.getDefaultParent(), '', 'TEST', 0, 0, 100, 100);
    } finally {
      model.endUpdate();
      new mx.mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
   // mxEvent.disableContextMenu(this.graphContainer.nativeElement);
   //// var mxLoadResources = false;

   //// const graph = new mxGraph(this.graphContainer.nativeElement);
   // try {
   //   const editor = new mxEditor(this.graphContainer.nativeElement);

   //   const parent = graph.getDefaultParent();
   //   graph.getModel().beginUpdate();
   //   //const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
   //   //const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
   //   //graph.insertEdge(parent, '', '', vertex1, vertex2);
   //   //const editor = new mxEditor();
   //   var v1 = graph.insertVertex(parent, null, 'Process', 60, 60, 90, 40);
   //   var toolBar: mxDefaultToolbar = editor.createToolbar();
   //   //var v2 = graph.insertVertex(v1, null, 'in', 0, 0.5, 20, 20, 'fontSize=12;shape=cylinder;resizable=3;');
   //   //v2.geometry.offset = new mxPoint(-10, -10);
   //   //v2.geometry.relative = true;
   //   //var v3 = graph.insertVertex(v1, null, 'out', 1, 0.5, 20, 20, 'fontSize=9;shape=ellipse;resizable=0;');
   //   //v3.geometry.offset = new mxPoint(-10, -10);
   //   //v3.geometry.relative = true;
   // } finally {
      //graph.getModel().endUpdate();
      //new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
   // }

    if (this.loggedin())
      this.serviceSignalR.startConnection();
  }

  loggedin(){
    return this.authService.loggedin();
  }
}
