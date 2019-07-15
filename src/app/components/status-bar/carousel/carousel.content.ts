import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en-US');
const formattedTime = datePipe.transform( Date.now(), 'h:mm a');
let cards = [
  {
    data: 0,
    title: 'Last Block',
    timestamp: formattedTime,
    icon: 'fa-cube'
  },
  {
    data: 0,
    title: 'Consensus',
    timestamp: formattedTime,
    icon: 'fa-atom'
  },
  {
    data: 0,
    title: 'Validators',
    timestamp: formattedTime,
    icon: 'fa-user-tie'
  },
  {
    data: 0,
    title: 'Bonded',
    timestamp: formattedTime,
    icon: 'fa-database'
  },
  {
    data: 0,
    title: 'Block Time',
    timestamp: formattedTime,
    icon: 'fa-clock'
  },
  {
    data: 0,
    title: 'Community Pool',
    timestamp: formattedTime,
    icon: 'fa-hand-holding-heart'
  },
  {
    data: 0,
    title: 'Inflation',
    timestamp: formattedTime,
    icon: 'fa-arrow-up'
  },
  {
    data: 0,
    title: 'Price (USD)',
    timestamp: formattedTime,
    icon: 'fa-hand-holding-usd'
  }
];
export { cards };