import { Component, OnInit, HostBinding } from '@angular/core';
import { StartupService } from './services/startup.service';
import {  trigger, 
          query, 
          transition, 
          animate, 
          style, 
          useAnimation, 
          animateChild, 
          group, 
          stagger } from '@angular/animations';
import { fadeInAnimation, fade } from './animations/animation';
import { selectActiveTheme } from './state/app/app.reducers';
import { Store } from '@ngrx/store';
import { State } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('dropDownAnimation', [
      transition(':enter',[
        group([
          query('h1, h2', [
            style({ transform: 'translateY(-20px)'}),
            animate(1000)
          ]),
          query('@fadeInAnimation', 
            stagger(200, [ animateChild() ])
          )
        ])
      ])
    ]),
    trigger('fadeInAnimation',[
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1500ms'
          }
        })
      ])
    ]),
    fade
  ]
})
export class AppComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  theme$ = this.appStore.select(selectActiveTheme);

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private startupService: StartupService,
    private appStore: Store<State>
  ) {  }

  ngOnInit() { 
    this.startupService.initApp();

    this.theme$.subscribe((theme: string) => {
      console.log(theme);
      // this.overlayContainer.getContainerElement().className = `cdk-overlay-container ${theme}`;
      this.componentCssClass = theme;
    });
  }

}

