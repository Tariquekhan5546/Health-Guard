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
  "st1":  {"name":"Andaman and Nicobar Islands","shortname":"AN","comment":"0","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st2":  {"name":"Andhra Pradesh","shortname":"AP","comment":"75000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st3":  {"name":"Arunachal Pradesh","shortname":"AR","comment":"4500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st4":  {"name":"Assam","shortname":"AS","comment":"25000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st5":  {"name":"Bihar","shortname":"BR","comment":"30000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st6":  {"name":"Chandigarh","shortname":"CH","comment":"2250","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st7":  {"name":"Chhattisgarh","shortname":"CT","comment":"15000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st8":  {"name":"Dadra and Nagar Haveli and Daman and Diu","shortname":"DD","comment":"0","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st9":  {"name":"National Capital Territory of Delhi","shortname":"DL","comment":"27500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st10": {"name":"Goa","shortname":"GA","comment":"1500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st11": {"name":"Gujarat","shortname":"GJ","comment":"34000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st12": {"name":"Himachal Pradesh","shortname":"HP","comment":"7500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st13": {"name":"Haryana","shortname":"HR","comment":"24000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st14": {"name":"Jharkhand","shortname":"JH","comment":"14000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st15": {"name":"Jammu and Kashmir","shortname":"JK","comment":"8500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st16": {"name":"Karnataka","shortname":"KA","comment":"37500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st17": {"name":"Kerala","shortname":"KL","comment":"42500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st18": {"name":"Ladakh","shortname":"LA","comment":"700","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st19": {"name":"Lakshadweep","shortname":"LD","comment":"0","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st20": {"name":"Maharashtra","shortname":"MH","comment":"255000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st21": {"name":"Meghalaya","shortname":"ML","comment":"2250","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st22": {"name":"Manipur","shortname":"MN","comment":"2500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st23": {"name":"Madhya Pradesh","shortname":"MP","comment":"29000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st24": {"name":"Mizoram","shortname":"MZ","comment":"2000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st25": {"name":"Nagaland","shortname":"NL","comment":"1750","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st26": {"name":"Orissa","shortname":"OR","comment":"26500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st27": {"name":"Punjab","shortname":"PB","comment":"21000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st28": {"name":"Puducherry","shortname":"PY","comment":"1900","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st29": {"name":"Rajasthan","shortname":"RJ","comment":"34000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st30": {"name":"Sikkim","shortname":"SK","comment":"1400","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st31": {"name":"Telangana","shortname":"TG","comment":"36000","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st32": {"name":"Tamil Nadu","shortname":"TN","comment":"42500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st33": {"name":"Tripura","shortname":"TR","comment":"4500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st34": {"name":"Uttar Pradesh","shortname":"UP","comment":"62500","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st35": {"name":"Uttarakhand","shortname":"UT","comment":"5750","link":"","color":"#7798bb","colorOver":"#366CA3"},
  "st36": {"name":"West Bengal","shortname":"WB","comment":"47500","link":"","color":"#7798bb","colorOver":"#366CA3"}
}
,
  "points": {}
};

// === Helpers ===
function formatNumber(num) {
  if (num >= 1_000_000) {
    // Millions: keep 1 decimal, remove .0
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  } else if (num >= 1_000) {
    // Thousands: no decimal
    return Math.floor(num / 1_000) + "K+";
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

// Apply dynamic colors based on comment ranges
Object.values(map_cfg.map_data).forEach(st => {
  const val = parseInt(st.comment, 10);

  if (val === 0) {
    st.color = "#d9d9d9";       // Grey
  } else if (val <= 20000) {
    st.color = "#41ab5d";       // Light green
  } else if (val <= 50000) {
    st.color = "#fdae61";       // Medium green
  } else if (val <= 250000) {
    st.color = "#ff6600";       // Orange
  } else if (val <= 500000) {
    st.color = "#e6550d";       // Darker orange (closer to red)
  } else {
    st.color = "#f03b50";       // Lighter red
  }

  // Hover = darker version of base color
  st.colorOver = darkenColor(st.color, 30);
});

// === Remove watermark and add legend ===
window.addEventListener("load", function() {
   // 1. Remove watermark
  const observer = new MutationObserver(() => {
    const wm = document.querySelector("a[href*='fla-shop']");
    if (wm) {
      wm.remove();
      observer.disconnect();
      console.log("Watermark removed ✅");
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });


  // 2. Add custom legend
  const container = document.getElementById("map-container");
  if (container) {
    const legend = document.createElement("div");
    legend.id = "map-legend";
    legend.innerHTML = `
      <div id="legend-title">Viral Cases of 2025</div>
      <div><span style="background:#d9d9d9"></span> 0 cases</div>
      <div><span style="background:#41ab5d"></span> 1 – 20,000</div>
      <div><span style="background:#fdae61"></span> 20,001 – 50,000</div>
      <div><span style="background:#ff6600"></span> 50,001 – 250,000</div>
      <div><span style="background:#e6550d"></span> 250,001 – 500,000</div>
      <div><span style="background:#f03b50"></span> 500,001+</div>
    `;
    container.appendChild(legend);
  }
});
