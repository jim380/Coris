import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>(); 

  constructor() {
  }

  ngOnInit() {

  }

  onToggle() {
    this.sidenavToggle.emit();
  }
}
