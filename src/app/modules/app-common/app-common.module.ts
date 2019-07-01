import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ChartsModule } from 'ng-uikit-pro-standard';
import { ClipboardModule } from 'ngx-clipboard';
import { DropdownDirective } from 'src/app/Directives/dropdown.directive';
import { BgHighlightDirective } from 'src/app/Directives/bg-highlight.directive';
import { ScrollTopComponent } from 'src/app/components/scroll-top/scroll-top.component';
import { AgoPipe } from 'src/app/pipes/ago.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    BgHighlightDirective,
    ScrollTopComponent,
    AgoPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    ClipboardModule,
  ],
  exports: [
    MaterialModule,
    ChartsModule,
    ClipboardModule,
    DropdownDirective,
    BgHighlightDirective,
    ScrollTopComponent,
    AgoPipe
  ]
})
export class AppCommonModule { }
