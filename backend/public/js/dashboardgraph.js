// ✅ Load Google Charts once
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(initCharts);

// ====== DATA (Monthly stays static) ======
const monthlyData = {
  2020: [1200,1100,1300,1600,1700,1500,1400,1300,1200,1100,1000,1000],
  2021: [1500,1400,1600,2000,2200,1800,1700,1600,1500,1400,1300,1300],
  2022: [1400,1300,1500,1700,1600,1500,1400,1300,1200,1100,1000,1000],
  2023: [1300,1200,1400,1600,1500,1400,1300,1200,1100,1000,900,900],
  2024: [1200,1100,1300,1500,1400,1300,1200,1100,1000,900,800,800],
  2025: [700,600,800,900,850,800,700,650,30,20,15,10],
  2026:[6,3,4,0,0,0,0,0,0,0,0,0]
};

const monthlyOtherData = {
  2020: [2800,2700,2600,2400,2500,2700,2900,3000,2900,2800,2700,2700],
  2021: [2400,2300,2200,2000,2100,2300,2400,2500,2400,2300,2200,2200],
  2022: [2200,2100,2000,1900,2000,2200,2300,2400,2300,2200,2100,2100],
  2023: [2000,1900,1800,1700,1800,2000,2100,2200,2100,2000,1900,1900],
  2024: [2400,2300,2200,2100,2200,2400,2500,2600,2500,2400,2300,2300],
  2025: [2600,2500,2400,2300,2400,2600,2700,2800,40,50,35,20],
  2026:[20,30,10,0,0,0,0,0,0,0,0,0]
};

// ====== INIT FUNCTION ======
function initCharts() {
    drawMonthlyChart(2025);   // default monthly chart
    drawStateBarChart(2025);  // default state chart
    setupDropdowns();          // attach dropdown handlers
}

// ====== MONTHLY LINE CHART ======
function drawMonthlyChart(year) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const rows = months.map((m,i)=>[m,(monthlyData[year][i]||0)*1000,(monthlyOtherData[year][i]||0)*1000]);

  const data = new google.visualization.DataTable();
  data.addColumn('string','Month');
  data.addColumn('number','Viral Diseases');
  data.addColumn('number','Other Diseases');
  data.addRows(rows);

  const newData = new google.visualization.DataTable();
  newData.addColumn('string','Month');
  newData.addColumn('number','Viral Diseases');
  newData.addColumn({type:'string',role:'tooltip',p:{html:true}});
  newData.addColumn('number','Other Diseases');
  newData.addColumn({type:'string',role:'tooltip',p:{html:true}});

  function formatCompactPlus(num){
    if(num===0) return "0";
    if(num>=1_000_000) return Math.floor(num/1_000_000)+"M+";
    if(num>=1_000) return Math.floor(num/1_000)+"K+";
    return num+"+";
  }

  rows.forEach(([month, viral, other])=>{
    newData.addRow([
      month,
      viral,
      `<b>${month}</b><br>Viral Diseases: ${formatCompactPlus(viral)}`,
      other,
      `<b>${month}</b><br>Other Diseases: ${formatCompactPlus(other)}`
    ]);
  });

  const options = {
    curveType:'function',
    legend:{position:'bottom'},
    animation:{startup:true,duration:1000,easing:'out'},
    hAxis:{title:'Month'},
    vAxis:{title:'Cases',viewWindow:{min:0},format:'short'},
    chartArea:{left:60,top:60,width:'75%',height:'70%'},
    colors:['#e74c3c','#3498db'],
    pointSize:6,
    tooltip:{isHtml:true}
  };

  const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(newData,options);
  window.addEventListener('resize',()=>chart.draw(newData,options));
}

async function drawStateBarChart(year, selectedState="all") {
    const titleEl = document.getElementById("chart-title1");
    const stateCasesCard = document.getElementById("state-cases-card");
    const stateTrendCard = document.getElementById("state-trend-card");
    const highestCard = document.getElementById("highest-card");
    const lowestCard = document.getElementById("lowest-card");

    if(titleEl) titleEl.innerText = `State-Wise Cases in ${year}`;

    const res = await fetch(`/api/state-cases/${year}`);
    const dbData = await res.json();
    if(!dbData || dbData.length === 0) return;

    const shortMap = {
        "Andhra Pradesh":"AP","Arunachal Pradesh":"AR","Assam":"AS",
        "Bihar":"BR","Chandigarh":"CH","Chhattisgarh":"CG","Delhi":"DL",
        "Goa":"GA","Gujarat":"GJ","Haryana":"HR","Himachal Pradesh":"HP",
        "Jammu & Kashmir":"JK","Jharkhand":"JH","Karnataka":"KA","Kerala":"KL",
        "Ladakh":"LA","Madhya Pradesh":"MP","Maharashtra":"MH","Manipur":"MN",
        "Meghalaya":"ML","Mizoram":"MZ","Nagaland":"NL","Odisha":"OD",
        "Puducherry":"PY","Punjab":"PB","Rajasthan":"RJ","Sikkim":"SK",
        "Tamil Nadu":"TN","Telangana":"TG","Tripura":"TR","Uttar Pradesh":"UP",
        "Uttarakhand":"UK","West Bengal":"WB"
    };

    function formatCases(value){
        if(value >= 1000) return (value/1000).toFixed(1).replace(/\.0$/,'')+"M+";
        if(value >= 1) return value+"K+";
        return value+"";
    }

    const sortedData = [...dbData].sort((a,b) => b.cases - a.cases);
    const highestState = sortedData[0].state_ut;
    const lowestState = sortedData[sortedData.length-1].state_ut;
    const totalCases = dbData.reduce((sum,d) => sum + d.cases, 0);

    if(selectedState === "all"){
        if(stateCasesCard) stateCasesCard.querySelector("p").innerText = `All States(Total): ${formatCases(totalCases)}`;
        if(highestCard){
            highestCard.querySelector("h3").innerText = `🔝 State with Highest Cases in ${year}`;
            highestCard.querySelector("p").innerText = highestState;
        }
        if(lowestCard){
            lowestCard.querySelector("h3").innerText = `🔽 State with Lowest Cases in ${year}`;
            lowestCard.querySelector("p").innerText = lowestState;
        }
    } else {
        const selData = dbData.find(d => d.state_ut === selectedState);
        const cases = selData ? selData.cases : 0;
        if(stateCasesCard) stateCasesCard.querySelector("p").innerText = `${selectedState}: ${formatCases(cases)}`;
        if(highestCard){
            highestCard.querySelector("h3").innerText = `📍 Selected State (${year})`;
            highestCard.querySelector("p").innerText = selectedState;
        }
        if(lowestCard){
            lowestCard.querySelector("h3").innerText = `📊 Cases in ${year}`;
            lowestCard.querySelector("p").innerText = `${formatCases(cases)} cases`;
        }
    }

    // ---------- Compute trend for all states or specific state ----------
    let trendText = "—";
    const prevYear = String(parseInt(year) - 1);
    try {
        const prevRes = await fetch(`/api/state-cases/${prevYear}`);
        const prevData = await prevRes.json();

        if(prevData && prevData.length){
            if(selectedState === "all"){
                const prevTotal = prevData.reduce((sum,d) => sum + d.cases, 0);
                if(totalCases > prevTotal) trendText = "🔺 Rising";
                else if(totalCases < prevTotal) trendText = "🔻 Falling";
                else trendText = "➖ Stable";
            } else {
                const selCases = dbData.find(d => d.state_ut === selectedState)?.cases || 0;
                const prevCases = prevData.find(d => d.state_ut === selectedState)?.cases || 0;
                if(selCases > prevCases) trendText = "🔺 Rising";
                else if(selCases < prevCases) trendText = "🔻 Falling";
                else trendText = "➖ Stable";
            }
        }
    } catch(err){
        console.error("Error fetching previous year data for trend:", err);
        trendText = "—";
    }

    if(stateTrendCard) stateTrendCard.querySelector("p").innerText = trendText;

    // ---------- Prepare chart ----------
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string','State');
    dataTable.addColumn('number','Cases');
    dataTable.addColumn({type:'string',role:'tooltip',p:{html:true}});
    dataTable.addColumn({type:'string',role:'style'});

    sortedData.forEach(({state_ut,cases})=>{
        let color = "#d3d3d3";
        if(selectedState==="all" || state_ut===selectedState) color="#e67e22";
        dataTable.addRow([shortMap[state_ut]||state_ut,cases,`<b>${state_ut}</b>: ${formatCases(cases)}`,`color: ${color}`]);
    });

    const options = {
        legend:{position:"none"},
        bars:"vertical",
        hAxis:{title:"States",slantedText:true,slantedTextAngle:45},
        vAxis:{title:"Total Viral Cases"},
        chartArea:{width:"80%",height:"80%"},
        tooltip:{isHtml:true}
    };

    const chart = new google.visualization.ColumnChart(document.getElementById("barchart"));
    chart.draw(dataTable,options);
    window.addEventListener('resize',()=>chart.draw(dataTable,options));
}


// ====== DROPDOWN HANDLERS ======
function setupDropdowns() {
    const yearSelect = document.getElementById("state-year-select");
    const stateSelect = document.getElementById("state-select");

    function updateChart() {
        const year = yearSelect.value || "2025";
        const state = stateSelect ? stateSelect.value || "all" : "all";
        drawStateBarChart(year,state);
    }

    if(yearSelect) yearSelect.addEventListener("change",updateChart);
    if(stateSelect) stateSelect.addEventListener("change",updateChart);
}
