import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ServiceSignalR } from './_services/ServiceSignalR';
import { AuthService } from './_services/auth.service';
//import { mxEvent, mxGraph } from 'mxgraph';
declare var mxGraph: any;
declare var mxHierarchicalLayout: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})





export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: true }) graphContainer: ElementRef;


  constructor(private authService: AuthService, private serviceSignalR: ServiceSignalR){
    
  }
  ngAfterViewInit() {
   // mxEvent.disableContextMenu(this.graphContainer.nativeElement);
   // var mxLoadResources = false;
    const graph = new mxGraph(this.graphContainer.nativeElement);
    try {

      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      //const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      //const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
      //graph.insertEdge(parent, '', '', vertex1, vertex2);

      var v1 = graph.insertVertex(parent, null, 'Process', 60, 60, 90, 40);
      var v2 = graph.insertVertex(v1, null, 'in', 0, 0.5, 20, 20, 'fontSize=9;shape=cylinder;resizable=0;');
      //v2.geometry.offset = new mxPoint(-10, -10);
      v2.geometry.relative = true;
      var v3 = graph.insertVertex(v1, null, 'out', 1, 0.5, 20, 20, 'fontSize=9;shape=ellipse;resizable=0;');
      v3.geometry.offset = new mxPoint(-10, -10);
      v3.geometry.relative = true;
    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }

    if (this.loggedin())
      this.serviceSignalR.startConnection();
  }

  loggedin(){
    return this.authService.loggedin();
  }
}
