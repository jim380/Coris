import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

// To use, add [appBgHighlight]="' '" defaultColor=" " to the class of an item in HTML
// example:
// <p [appBgHighlight]="'red'" defaultColor="yellow">some text here</p>

@Directive({
  selector: '[appBgHighlight]'
})

export class BgHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBgHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
