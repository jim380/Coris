const commissionChart = {
  datasets: [
    {
      data: [],
      label: 'Rate'
    },
    {
      data: [],
      label: 'Max Rate',
      hidden: true
    },
    {
      data: [],
      label: 'Rate Change',
      hidden: true
    }
  ],
  labels: [],
  colors: [
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      // borderColor: 'rgba(255,255,255,1)',
      // borderWidth: 1,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      // borderColor: 'rgba(255,255,255,1)',
      // borderWidth: 1,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      // borderColor: 'rgba(255,255,255,1)',
      // borderWidth: 1,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    }
  ],
  type: 'bar',
  options: {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }]
    }
  }
};

const blockChart = {
  datasets: [
    {data: [], label: 'Block Time'}
  ],
  labels: [0, 40, 60, 80, 100],
  colors: [
    {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
  ],
  type: 'line'
};



const radarChart = {
  datasets: [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ],
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  colors: [
    // {
    //   backgroundColor: 'rgba(105, 0, 132, .2)',
    //   borderColor: 'rgba(200, 99, 132, .7)',
    //   borderWidth: 2,
    // },
    // {
    //   backgroundColor: 'rgba(0, 250, 220, .2)',
    //   borderColor: 'rgba(0, 213, 132, .7)',
    //   borderWidth: 2,
    // }
  ],
  options: {
    responsive: true
  },
  type: 'radar'
};

export { 
  commissionChart,
  radarChart,
  blockChart    
};