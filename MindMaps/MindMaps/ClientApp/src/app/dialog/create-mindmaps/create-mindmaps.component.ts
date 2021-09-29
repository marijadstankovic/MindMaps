import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MindmapsService } from '../../_services/mindmaps.service';

@Component({
  selector: 'app-create-mindmaps',
  templateUrl: './create-mindmaps.component.html',
  styleUrls: ['./create-mindmaps.component.css']
})
export class CreateMindmapsComponent implements OnInit {
  documentName: string;

  constructor(
    private mindMapService: MindmapsService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateMindmapsComponent>,
    @Inject(MAT_DIALOG_DATA) public roomId: any) { }


  ngOnInit() {
  }

  createDocument() {
    this.mindMapService.createMindmap(this.roomId, this.documentName)
      .subscribe((mapId) => {
        console.log("mapId: " + mapId);
        this.router.navigate(['/editor', mapId]);
      });
    console.log(this.documentName);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
