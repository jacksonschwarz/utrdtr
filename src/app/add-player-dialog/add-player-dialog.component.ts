import { Component, OnInit, Inject} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material"
@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.css']
})
export class AddPlayerDialogComponent implements OnInit {

  name:string;

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  closeDialog(){
    this.dialogRef.close(this.name)
  }
  ngOnInit() {
  }

}
