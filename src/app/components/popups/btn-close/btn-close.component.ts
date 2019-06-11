import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-btn-close',
  templateUrl: './btn-close.component.html',
  styleUrls: ['./btn-close.component.scss']
})
export class BtnCloseComponent {
  @Input() dialogRef: MatDialogRef<any>;
  @Input() link: String;

  onCloseClick() {
    this.dialogRef.close();
  }
}
