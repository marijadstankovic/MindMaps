import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
//import { mxEvent, mxGraph } from 'mxgraph';
declare var mxGraph: any;
declare var mxHierarchicalLayout: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})





export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;

  ngAfterViewInit() {
   // mxEvent.disableContextMenu(this.graphContainer.nativeElement);
   // var mxLoadResources = false;
    const graph = new mxGraph(this.graphContainer.nativeElement);
    try {

      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
      graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
  }
}
