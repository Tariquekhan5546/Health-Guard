google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // ✅ Your dataset
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Viral Diseases (in thousands)', 'Other Diseases (in thousands)'],
    ['2020', 10500, 32000],
    ['2021', 31000, 28000],
    ['2022', 36000, 27000],
    ['2023', 3000,  25000],
    ['2024', 2900,  30000],
    ['2025', 300,   32000]
  ]);

  // ✅ Chart options
  var options = {
    
    curveType: 'function',
    legend: { position: 'bottom' },
    animation: {
      startup: true,
      duration: 1000,
      easing: 'out'
    },
    hAxis: {
      title: 'Year'
    },
    vAxis: {
      title: 'Number of Cases × 1,000',
      viewWindow: { min: 0 }
    },
    chartArea: {
      width: '75%',
      height: '80%'
    },
    colors: ['#e74c3c', '#3498db'], // red for Viral, blue for Other
    pointSize: 6 // ✅ adds visible points on the line
  };

  // ✅ Draw chart inside div
  var chart = new google.visualization.LineChart(
    document.getElementById('curve_chart')
  );
  chart.draw(data, options);

  // ✅ Make it responsive
  window.addEventListener('resize', () => chart.draw(data, options));
}
