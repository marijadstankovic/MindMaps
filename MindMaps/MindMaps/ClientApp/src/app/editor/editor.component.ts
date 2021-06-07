import { Component, OnInit } from '@angular/core';
import factory from 'mxgraph';

declare var require: any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
   //https://stackoverflow.com/questions/49922708/how-to-integrate-mxgraph-with-angular-4/54689971#54689971
  //https://www.npmjs.com/package/@typed-mxgraph/typed-mxgraph
  constructor() {
  }

  ngOnInit() {
    const mx = factory({
      mxBasePath: '',
    });
    console.log(mx.mxClient.VERSION);
  }

}
