import { Component, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @ViewChild('sidenav') public el: any;

  @HostListener('swiperight', ['$event']) public swipePrev(event: any) {
  this.el.show();
  }
}