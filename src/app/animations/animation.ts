import { trigger, state, transition, animate, style, keyframes, animation, useAnimation } from '@angular/animations';

export let bounceOutLeftAnimation = animation (
  animate('0.5s ease-out', keyframes([
    style({ 
      offset: .2,
      opacity: 1,
      transform: 'translateX(20px)'
     }),
     style({ 
      offset: 1,
      opacity: 0,
      transform: 'translateX(-100%)'
     })
  ]))
)

export let fadeInAnimation = animation ([
  style({opacity:0}),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '1s',
    easing: 'ease-out'
  }
})

export let fade = trigger('fade',
  [
    transition(':enter',
    useAnimation(fadeInAnimation)    
    ),
    transition(':leave', [
      animate(1000, style({opacity:0}))
    ])
  ]
)

export let slide = trigger('slide',
  [
    transition(':enter', [
      style({ transform: 'translateX(-10px)'}),
      animate(500)
    ]),
    transition(':leave',
      useAnimation(bounceOutLeftAnimation)
    )
  ]
)

export let dropDown = trigger('dropDown',
  [
    transition(':enter',[
      style({ transform: 'translateY(-20px)'}),
      animate(1000)
    ]   
    )
  ]
)
