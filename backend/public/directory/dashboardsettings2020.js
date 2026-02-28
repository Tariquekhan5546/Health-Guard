var map_cfg = {
 "mapWidth": "80%",
 "mapHeight": 400,
 "borderColor": "#ffffff",
 "borderColorOver": "#ffffff",
 "nameColor": "#ffffff",
 "nameColorOver": "#ffffff",
 "nameFontSize": "10px",
 "nameFontWeight": "bold",
 "nameStroke": true,
 "nameStrokeColor": "#000000",
 "nameStrokeWidth": 1.5,
 "mapId": "7f5w8",
"map_data": {
    "st1":  {"name":"Andaman and Nicobar Islands","shortname":"AN","comment":0,"link":""},
    "st2":  {"name":"Andhra Pradesh","shortname":"AP","comment":650000,"link":""},
    "st3":  {"name":"Arunachal Pradesh","shortname":"AR","comment":18000,"link":""},
    "st4":  {"name":"Assam","shortname":"AS","comment":220000,"link":""},
    "st5":  {"name":"Bihar","shortname":"BR","comment":160000,"link":""},
    "st6":  {"name":"Chandigarh","shortname":"CH","comment":9000,"link":""},
    "st7":  {"name":"Chhattisgarh","shortname":"CT","comment":55000,"link":""},
    "st8":  {"name":"Dadra and Nagar Haveli and Daman and Diu","shortname":"DD","comment":0,"link":""},
    "st9":  {"name":"Delhi","shortname":"DL","comment":200000,"link":""},
    "st10": {"name":"Goa","shortname":"GA","comment":6000,"link":""},
    "st11": {"name":"Gujarat","shortname":"GJ","comment":120000,"link":""},
    "st12": {"name":"Himachal Pradesh","shortname":"HP","comment":35000,"link":""},
    "st13": {"name":"Haryana","shortname":"HR","comment":65000,"link":""},
    "st14": {"name":"Jharkhand","shortname":"JH","comment":70000,"link":""},
    "st15": {"name":"Jammu and Kashmir","shortname":"JK","comment":35000,"link":""},
    "st16": {"name":"Karnataka","shortname":"KA","comment":300000,"link":""},
    "st17": {"name":"Kerala","shortname":"KL","comment":250000,"link":""},
    "st18": {"name":"Ladakh","shortname":"LA","comment":3000,"link":""},
    "st19": {"name":"Lakshadweep","shortname":"LD","comment":0,"link":""},
    "st20": {"name":"Maharashtra","shortname":"MH","comment":2390000,"link":""},
    "st21": {"name":"Meghalaya","shortname":"ML","comment":10000,"link":""},
    "st22": {"name":"Manipur","shortname":"MN","comment":12000,"link":""},
    "st23": {"name":"Madhya Pradesh","shortname":"MP","comment":140000,"link":""},
    "st24": {"name":"Mizoram","shortname":"MZ","comment":9000,"link":""},
    "st25": {"name":"Nagaland","shortname":"NL","comment":8000,"link":""},
    "st26": {"name":"Odisha","shortname":"OR","comment":110000,"link":""},
    "st27": {"name":"Punjab","shortname":"PB","comment":85000,"link":""},
    "st28": {"name":"Puducherry","shortname":"PY","comment":7000,"link":""},
    "st29": {"name":"Rajasthan","shortname":"RJ","comment":130000,"link":""},
    "st30": {"name":"Sikkim","shortname":"SK","comment":6000,"link":""},
    "st31": {"name":"Telangana","shortname":"TG","comment":150000,"link":""},
    "st32": {"name":"Tamil Nadu","shortname":"TN","comment":280000,"link":""},
    "st33": {"name":"Tripura","shortname":"TR","comment":18000,"link":""},
    "st34": {"name":"Uttar Pradesh","shortname":"UP","comment":320000,"link":""},
    "st35": {"name":"Uttarakhand","shortname":"UT","comment":25000,"link":""},
    "st36": {"name":"West Bengal","shortname":"WB","comment":270000,"link":""}
}

,
 "points": {}
};

// === Helpers ===
function formatNumber(num) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  }
  return num + "+";
}

function parseNumber(str) {
  if (typeof str === "number") return str; // already numeric
  str = str.replace("+", "").toUpperCase();
  if (str.endsWith("M")) return parseFloat(str) * 1_000_000;
  if (str.endsWith("K")) return parseFloat(str) * 1_000;
  return parseInt(str, 10);
}

function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - percent;
  let g = ((num >> 8) & 0x00FF) - percent;
  let b = (num & 0x0000FF) - percent;

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return "#" + (b | (g << 8) | (r << 16)).toString(16).padStart(6, "0");
}
// === Apply dynamic colors and format comments ===
Object.values(map_cfg.map_data).forEach(st => {
  const val = parseNumber(st.comment);

  // Format comment with K/M for display
  st.comment = formatNumber(val);

  // Assign colors
    if (val === 0) {
  st.color = "#d9d9d9";        // Grey (no cases)
} else if (val <= 20000) {
  st.color = "#75e469";        // Light green
} else if (val <= 50000) {
  st.color = "#33b95b";        // Medium green
} else if (val <= 100000) {
  st.color = "#008937";        // Dark green
} else if (val <= 200000) {
  st.color = "#fdae61";        // Orange
} else if (val <= 500000) {
  st.color = "#e6550d";        // Dark orange
} else if (val <= 1500000) {
  st.color = "#ff2a43";        // Red
} else {
  st.color = "#bd0026";        // Dark red (extreme)
}

  st.colorOver = darkenColor(st.color, 30);
});
function createLegend(year) {
  // 1. Remove watermark if exists
  const wm = document.querySelector("a[href*='fla-shop']");
  if (wm) wm.remove();

  // 2. Add / update legend
  const legendContainer = document.querySelector(".card"); 
  if (!legendContainer) return;

  // Remove old legend if exists
  const oldLegend = document.getElementById("map-legend");
  if (oldLegend) oldLegend.remove();

  // Ranges with colors (same for all years)
  const ranges = [
  { range: "0 cases", color: "#d9d9d9" },
  { range: "1 – 20,000", color: "#75e469" },        // Light green
  { range: "20,001 – 50,000", color: "#33b95b" },   // Medium green
  { range: "50,001 – 100,000", color: "#008937" },  // Dark green
  { range: "100,001 – 200,000", color: "#fdae61" }, // Orange
  { range: "200,001 – 500,000", color: "#e6550d" }, // Dark orange
  { range: "500,001 – 1,500,000", color: "#ff2a43" }, // Red
  { range: "1,500,001+", color: "#bd0026" }          // Dark red
];


  // Create legend element
  const legend = document.createElement("div");
  legend.id = "map-legend";

  // Add dynamic year in title
  legend.innerHTML = `<div id="legend-title">Viral Cases of ${year}</div>`;

  // Add ranges with color swatches
  ranges.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<span style="background:${item.color}"></span> ${item.range}`;
    legend.appendChild(div);
  });

  // Append legend to container
  legendContainer.appendChild(legend);
}



