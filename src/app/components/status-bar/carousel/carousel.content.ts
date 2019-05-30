import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en-US');
const formattedTime = datePipe.transform( Date.now(), 'h:mm a');
let cards = [
  {
    data: 0,
    title: 'Last Block',
    timestamp: formattedTime,
    icon: 'cubes'
  },
  {
    data: 0,
    title: 'Consensus',
    timestamp: formattedTime,
    icon: 'atom'
  },
  {
    data: 0,
    title: 'Validators',
    timestamp: formattedTime,
    icon: 'user-tie'
  },
  {
    data: 0,
    title: 'Bonded',
    timestamp: formattedTime,
    icon: 'database'
  },
  {
    data: 0,
    title: 'Block Time',
    timestamp: formattedTime,
    icon: 'clock'
  },
  {
    data: 0,
    title: 'Community Pool',
    timestamp: formattedTime,
    icon: 'hand-holding-heart'
  },
  {
    data: 0,
    title: 'Inflation',
    timestamp: formattedTime,
    icon: 'arrow-up'
  },
  {
    data: 0,
    title: 'Price (USD)',
    timestamp: formattedTime,
    icon: 'hand-holding-usd'
  }
];
export { cards };