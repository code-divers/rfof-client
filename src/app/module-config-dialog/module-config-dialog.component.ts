import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rfof-module-config-dialog',
  templateUrl: './module-config-dialog.component.html',
  styleUrls: ['./module-config-dialog.component.scss']
})
export class ModuleConfigDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  onClose(): void {
  	this.dialogRef.close();
  }

}
