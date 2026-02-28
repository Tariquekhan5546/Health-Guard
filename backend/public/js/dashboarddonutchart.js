// ------------------------
// ✅ Google Charts Load
// ------------------------
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(init);

// ------------------------
// ✅ Global Variables
// ------------------------
const diseaseLabels = ["COVID-19", "Dengue", "Chikungunya", "Zika", "HFMD", "Hepatitis A/E", "Other Minor Viral"];
let districts = []; // fetched from API
let viralData = []; // fetched per year

// ------------------------
// ✅ Number Formatter for K+ and M+
// ------------------------
function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M+";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K+";
  return n;
}

// ------------------------
// ✅ Fetch Viral Data for a Year
// ------------------------
async function fetchViralData(year) {
  try {
    const res = await fetch(`/api/viral-data?year=${year}`);
    const data = await res.json();
    return data; // array of arrays per district
  } catch (err) {
    console.error("❌ Error fetching viral data:", err);
    return [];
  }
}

// ------------------------
// ✅ Fetch Districts
// ------------------------
async function fetchDistricts() {
  try {
    const res = await fetch("/api/districts");
    const data = await res.json();
    districts = data;

    const districtSelect = document.getElementById("district-select");
    districts.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      districtSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("❌ Error fetching districts:", err);
  }
}

// ------------------------
// ✅ Initialize Charts & Event Listeners
// ------------------------
async function init() {
  await fetchDistricts();

  const yearSelect = document.getElementById("districtyear");
  const districtSelect = document.getElementById("district-select");

  if (yearSelect) yearSelect.addEventListener("change", drawChart);
  if (districtSelect) districtSelect.addEventListener("change", drawChart);

  drawChart(); // initial load
}

// ------------------------
// ✅ Draw Donut Chart (Responsive & Centered Title)
// ------------------------
async function drawChart() {
  const yearSelect = document.getElementById("districtyear");
  const districtSelect = document.getElementById("district-select");

  const year = parseInt(yearSelect.value);
  viralData = await fetchViralData(year);

  const districtValue = districtSelect.value;
  const dataArray = [['Disease', 'Cases', { role: 'tooltip', type: 'string', p: { html: true } }]];

  // Prepare data with safe values (no negatives)
  if (districtValue === "all") {
    const sums = Array(diseaseLabels.length).fill(0);
    viralData.forEach(districtData =>
      districtData.forEach((val, i) => sums[i] += Math.max(0, val))
    );
    diseaseLabels.forEach((label, i) =>
      dataArray.push([label, sums[i], `${label}: ${formatNumber(sums[i])}`])
    );
  } else {
    const districtIndex = districts.indexOf(districtValue);
    if (districtIndex !== -1) {
      viralData[districtIndex].forEach((val, i) => {
        const safeVal = Math.max(0, val);
        dataArray.push([diseaseLabels[i], safeVal, `${diseaseLabels[i]}: ${formatNumber(safeVal)}`]);
      });
    }
  }

  const data = google.visualization.arrayToDataTable(dataArray);

  const options = {
    pieHole: 0.4,
    chartArea: { width: '70%', height: '90%' },
    legend: { position: 'right', alignment: 'center' },
    tooltip: { isHtml: true }
  };

  // ------------------------
  // ✅ Update Card Title
  // ------------------------
  const titleDiv = document.getElementById('donut-title');
  titleDiv.textContent = `Viral Disease Cases (${year})`;

  // ------------------------
  // ✅ Draw Chart
  // ------------------------
  const chartContainer = document.getElementById('donutchart');
  const chart = new google.visualization.PieChart(chartContainer);
  chart.draw(data, options);

  // ------------------------
  // ✅ Make Responsive
  // ------------------------
  window.addEventListener('resize', () => chart.draw(data, options));

  // Update Donut Cards
  updateDonutCards(year, districtValue);
}



// ------------------------
// ✅ Update Donut Cards (Safe Version)
// ------------------------
async function updateDonutCards(year, districtValue) {
  const prevYear = year - 1;

  let currentData = await fetchViralData(year);
  let prevData = prevYear >= 2020 ? await fetchViralData(prevYear) : null;

  let currentSums = Array(diseaseLabels.length).fill(0);
  let prevSums = prevData ? Array(diseaseLabels.length).fill(0) : null;

  if (districtValue === "all") {
    currentData.forEach(d => d.forEach((v, i) => currentSums[i] += Math.max(0, v)));
    if (prevData) prevData.forEach(d => d.forEach((v, i) => prevSums[i] += Math.max(0, v)));
  } else {
    const districtIndex = districts.indexOf(districtValue);
    if (districtIndex !== -1) {
      currentSums = currentData[districtIndex].map(v => Math.max(0, v));
      if (prevData) prevSums = prevData[districtIndex].map(v => Math.max(0, v));
    }
  }

  const highestIndex = currentSums.indexOf(Math.max(...currentSums));
  const lowestIndex = currentSums.indexOf(Math.min(...currentSums));
  const arrow = (curr, prev) => prev === null ? "" : (curr > prev ? "🔺" : curr < prev ? "🔻" : "");

  // Biggest change
  let trendText = "-";
  if (prevSums) {
    const changes = currentSums.map((val, i) => {
      if (prevSums[i] === 0) return { index: i, percentChange: null };
      const percent = ((val - prevSums[i]) / prevSums[i]) * 100;
      return { index: i, percentChange: percent };
    });

    const trendObj = changes.reduce((maxObj, currObj) => {
      if (currObj.percentChange === null) return maxObj;
      if (maxObj.percentChange === null) return currObj;
      return Math.abs(currObj.percentChange) > Math.abs(maxObj.percentChange) ? currObj : maxObj;
    }, changes[0]);

    const formatPercent = p => p === null ? "-" : `${p.toFixed(1)}%`;
    trendText = `${diseaseLabels[trendObj.index]} (${formatPercent(trendObj.percentChange)}) ${arrow(currentSums[trendObj.index], prevSums[trendObj.index])}`;
  }

  document.getElementById("donut-highest-card").innerHTML = `
    <h3>🔝 Highest Cases</h3>
    <p>${diseaseLabels[highestIndex]} : ${formatNumber(currentSums[highestIndex])} ${prevSums ? arrow(currentSums[highestIndex], prevSums[highestIndex]) : ""}</p>
  `;

  document.getElementById("donut-lowest-card").innerHTML = `
    <h3>🔽 Lowest Cases</h3>
    <p>${diseaseLabels[lowestIndex]} : ${formatNumber(currentSums[lowestIndex])} ${prevSums ? arrow(currentSums[lowestIndex], prevSums[lowestIndex]) : ""}</p>
  `;

  document.getElementById("donut-trend-card").innerHTML = `
    <h3>📈 Biggest Change</h3>
    <p>${trendText}</p>
  `;
}

