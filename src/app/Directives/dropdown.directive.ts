import { Directive, HostListener, HostBinding } from '@angular/core';

// To use, add appDropdown to the class of an item in HTML
// example:
// <li class="dropdown" appDropdown>

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
