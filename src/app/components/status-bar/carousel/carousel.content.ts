import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en-US');
const formattedTime = datePipe.transform( Date.now(), 'h:mm a');
let cards = [
  {
    data: 0,
    title: 'Last Block',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Consensus',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Validators',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Bonded',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Block Time',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Community Pool',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Inflation',
    timestamp: formattedTime
  },
  {
    data: 0,
    title: 'Price (USD)',
    timestamp: formattedTime
  }
];
export { cards} ;