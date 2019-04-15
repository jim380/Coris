import { trigger, state, transition, animate, style, keyframes, animation, useAnimation, sequence, query, stagger } from '@angular/animations';

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

export let rowsAnimation = trigger('rowsAnimation',
  [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
        animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);

export let staggerAnimation = trigger('staggerAnimation',
  [
    transition('* => *', [ // each time the binding value changes
      query(':leave', [
        stagger(100, [
          animate('0.5s', style({ opacity: 0 }))
        ])
      ]),
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          animate('0.5s', style({ opacity: 1 }))
        ])
      ])
    ])
  ]
)

export let expandableRow = trigger('expandableRow', [
  state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
  state('expanded', style({height: '*'})),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
])

  