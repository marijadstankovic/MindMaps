import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-mindmaps',
  templateUrl: './create-mindmaps.component.html',
  styleUrls: ['./create-mindmaps.component.css']
})
export class CreateMindmapsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateMindmapsComponent>,
    @Inject(MAT_DIALOG_DATA) public roomId: any) { }

  ngOnInit() {
  }

}
