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
    {data: [65, 59, 80, 81, 56, 55, 40], label: '#1'},
    {data: [28, 48, 10, 69, 36, 37, 110], label: '#2'},
    {data: [38, 58, 30, 79, 26, 37, 20], label: '#3'},
    {data: [48, 68, 20, 89, 76, 27, 40], label: '#4'}
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
  datasets: [65, 59, 40, 87],
  labels: [0, 40, 60, 80, 100],
  colors: [
    {
      backgroundColor: ['#4285F4', '#ffbb33', '#29b6f6', '#FF5252'],
      hoverBackgroundColor: ['#6ea0f2', '#fec451', '#52c3f6', '#fa6e6e']
    }
  ],
  options: {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    }
  },
  type: 'radar'
};

export { 
  commissionChart,
  radarChart,
  blockChart    
};