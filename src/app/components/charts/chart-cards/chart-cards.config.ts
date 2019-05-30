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
  type: 'scatter',
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
          labelString: 'Voting Power',
          // fontColor: 'white',
        },
        ticks: {
          // fontColor: 'white',
          callback: function (value) {
            return (Math.floor(value / 1000000)).toLocaleString(); // convert it to percentage
          }
        }
      }],
      xAxes: [{
        display: true,
        scaleLabel: {   // To format the scale Lebel
          display: true,
          labelString: 'Validator Count',
          // fontColor: 'white',
        },
        ticks: {
          // fontColor: 'white',
        }
      }]
    }
  }
};

export { 
  commissionChart,
  scatterChart,
  blockChart    
};