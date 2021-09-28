import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MindmapsService } from '../../_services/mindmaps.service';
import { SnackBarService } from '../../_services/snack-bar.service';

@Component({
  selector: 'app-change-name-mindmap',
  templateUrl: './change-name-mindmap.component.html',
  styleUrls: ['./change-name-mindmap.component.css']
})
export class ChangeNameMindmapComponent implements OnInit {

  MindMapName: string;

  constructor(
    private mindmapsService: MindmapsService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ChangeNameMindmapComponent>,
    @Inject(MAT_DIALOG_DATA) public idMap: any  ) { }

  ngOnInit() {
  }

  changeName() {
    this.mindmapsService.changeName(this.idMap, this.MindMapName)
      .subscribe(res => {
        this.snackBarService.openSnackBar("Name was changed.", "OK");
      });
  }

}
