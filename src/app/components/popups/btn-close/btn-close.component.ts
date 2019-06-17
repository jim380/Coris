import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-btn-close',
  templateUrl: './btn-close.component.html',
  styleUrls: ['./btn-close.component.scss']
})
export class BtnCloseComponent {
  @Input() dialogRef: MatDialogRef<any>;
  @Input() link: String;

  constructor(
    private toastr: ToastrService,
  ){ }

  onCloseClick() {
    this.dialogRef.close();
  }


  onCopySucceess() {
    this.toastr.success('Copied to clipboard');
  }
}
