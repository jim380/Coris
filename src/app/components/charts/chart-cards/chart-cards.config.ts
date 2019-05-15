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



const scatterChart = {
  datasets: [
    {
      data: [],
      label: 'Top100',
      pointRadius: 5,
    },
    {
      data: [],
      label: 'Top50',
      pointRadius: 5,
      hidden: true
    },
    {
      data: [],
      label: 'Top25',
      pointRadius: 5,
      hidden: true
    }
  ],
  colors: [],
  options: {
    responsive: true,
  },
  type: 'scatter'
};

export { 
  commissionChart,
  scatterChart,
  blockChart    
};