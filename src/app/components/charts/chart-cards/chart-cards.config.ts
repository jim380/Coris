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
      label: 'Max Change',
      hidden: true
    }
  ],
  labels: [],
  colors: [
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      hoverBorderColor: 'rgba(255,255,255,1)',
      hoverBorderWidth: 1,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      hoverBorderColor: 'rgba(255,255,255,1)',
      hoverBorderWidth: 1,
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,255,1)'
    },
    {
      backgroundColor: 'rgba(255,255,255,0.2)',
      hoverBorderColor: 'rgba(255,255,255,1)',
      hoverBorderWidth: 1,
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
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Validator Count',
          fontColor: 'white'
        },
        ticks: {
          fontColor: 'white',
        }
      }],
      xAxes: [{
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Commission Rate (%)',
          fontColor: 'white',
        },
        ticks: {
          fontColor: 'white',
          callback: function (value) {
            return (value*100).toFixed(1); // convert it to percentage
          }
        }
      }]
    },
    tooltip: {
      callbacks: {
        // Not working. Needs fixed
        label: function(tooltipItem, datasets) {
          var label = datasets.data[tooltipItem.datasetIndex].label
          return label;
        },
        value: function(tooltipItem, datasets) {
          var value = datasets.data[tooltipItem.datasetIndex].value
          return value;
        }
      }
    }
  }
};

const blockChart = {
  datasets: [
    {data: [], label: 'Block Time'},
    {data: [], label: 'Avg. Block Time'}
  ],
  labels: [0, 20, 40, 60, 80, 100],
  colors: [
    {
      // backgroundColor: 'rgba(220,220,220,0.32)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    },
    {
      // backgroundColor: 'rgba(6233,30,99,0.32)',
      borderColor: 'rgba(248,187,208,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(248,187,208,1)',
      pointBorderColor: '#F8BBD0',
      pointHoverBackgroundColor: '#F8BBD0',
      pointHoverBorderColor: 'rgba(248,187,208,1)'
    },
        
  ],
  type: 'line',
  options: {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    },
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Time (sec)',
          fontColor: 'white'
        },
        ticks: {
          fontColor: 'white',
        }
      }],
      xAxes: [{
        display: true,
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Last X Blocks',
          fontColor: 'white',
        },
        ticks: {
          fontColor: 'white',
        }
      }]
    }
  }
};



const scatterChart = {
  datasets: [
    {
      data: [],
      label: 'Voting Weight',
      pointRadius: 3,
    },
    {
      data: [],
      label: 'Self Bond',
      pointRadius: 3,
      hidden: true
    },
    {
      data: [],
      label: 'Assets',
      pointRadius: 3,
      hidden: true
    },
    {
      data: [],
      label: 'Rewards',
      pointRadius: 3,
      hidden: true
    }
  ],
  labels: [],
  colors: [
    {
      backgroundColor: 'rgba(248,187,208,0.4)',
    },
    {
      backgroundColor: 'rgba(0,188,212,0.4)',
    },
    {
      backgroundColor: 'rgba(255,152,0,0.4)',
    },
    {
      backgroundColor: 'rgba(76,175,80,0.4)',
    },
  ],
  type: 'bubble',
  options: {
    responsive: true,
    legend: {
      labels: {
        // fontColor: 'white',
      }
    },
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'ATOM',
          // fontColor: 'white',
        },
        ticks: {
          // fontColor: 'white',
          // stepSize: 1000000,
          beginAtZero: true,
          callback: function (value) {
            return (Math.floor(value / 1000000)).toLocaleString();
          }
        }
      }],
      xAxes: [{
        display: true,
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Validator Index',
          // fontColor: 'white',
        },
        ticks: {
          // fontColor: 'white',
        }
      }]
    }
  },
};

export { 
  commissionChart,
  scatterChart,
  blockChart    
};