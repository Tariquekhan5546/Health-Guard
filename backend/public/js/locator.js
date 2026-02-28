// Initialize map completely fixed
var map = L.map('map', {
  zoomControl: false,       // hide zoom controls
  scrollWheelZoom: false,   // disable scroll wheel zoom
  doubleClickZoom: false,   // disable double click zoom
  dragging: false,          // disable dragging
  boxZoom: false,           // disable box zoom
  keyboard: false,          // disable keyboard navigation
  touchZoom: false           // disable touch zoom
}).setView([20.5937, 78.9629], 4);

// Add tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var markers = [];

// Pagination variables
let currentPage = 1;
const hospitalsPerPage = 20;

// Create pagination container
let paginationContainer = document.createElement('div');
paginationContainer.id = "pagination";
paginationContainer.style.textAlign = "center";
paginationContainer.style.marginTop = "20px";
document.getElementById("hospitalList").after(paginationContainer);

// Populate state dropdown
var states = [...new Set(hospitals.map(h => h.state))];
states.forEach(state => {
  document.getElementById("stateFilter").innerHTML += `<option value="${state}">${state}</option>`;
});

// Populate city dropdown dynamically
function populateCities() {
  var state = document.getElementById("stateFilter").value;
  var cityDropdown = document.getElementById("cityFilter");
  cityDropdown.innerHTML = `<option value="">All Cities</option>`;
  var cities = [...new Set(hospitals.filter(h => !state || h.state === state).map(h => h.city))];
  cities.forEach(city => {
    cityDropdown.innerHTML += `<option value="${city}">${city}</option>`;
  });
}

// Flag for initial load
var isFirstLoad = true;

// Display hospitals with pagination
function displayHospitals(list) {
  currentPage = 1; // reset page when list changes

  function renderPage(page) {
    document.getElementById("hospitalList").innerHTML = "";

    // Remove old markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const start = (page - 1) * hospitalsPerPage;
    const end = start + hospitalsPerPage;
    const pageList = list.slice(start, end);

    // Add markers for all filtered hospitals (not just current page)
    list.forEach(h => {
      var marker = L.marker([h.lat, h.lon]).addTo(map)
        .bindPopup(`<b>${h.name}</b><br>${h.city}, ${h.state}<br><a href="${h.gmap}" target="_blank">📍 View on Google Maps</a>`);
      markers.push(marker);
    });

    // Render current page hospital cards
    pageList.forEach(h => {
      var card = `
  <div class="hospital-card" data-state="${h.state}" data-city="${h.city}">
    
    <h3>${h.name}</h3>
    
    <div class="hospital-meta">
      ${h.city}, ${h.state}
    </div>

    <div class="hospital-extra">
      <p><strong>Contact:</strong> ${h.contact || "N/A"}</p>
      <p>${h.description}</p>
      <button onclick="window.open('${h.gmap}', '_blank')">
        View on Map
      </button>
    </div>

    <button class="toggle-btn" onclick="toggleDetails(this)">
      View Details
    </button>

  </div>
`;

      document.getElementById("hospitalList").innerHTML += card;
    });

    // Map centering logic
    var state = document.getElementById("stateFilter").value;
    var city = document.getElementById("cityFilter").value;
    var query = document.getElementById("searchBar").value.trim();

    if (isFirstLoad || (!state && !city && !query)) {
      map.setView([20.5937, 78.9629], 4);
      isFirstLoad = false;
    } else if (pageList.length === 1) {
      map.setView([pageList[0].lat, pageList[0].lon], 19);
    } else if (pageList.length > 1) {
      var bounds = L.latLngBounds(list.map(h => [h.lat, h.lon]));
      map.fitBounds(bounds);
    } else {
      map.setView([20.5937, 78.9629], 4);
      setTimeout(() => map.setZoom(4), 100);
    }

    // Pagination
    renderPagination(list.length, page);
  }

  // Render pagination buttons
  function renderPagination(totalItems, page) {
    const totalPages = Math.ceil(totalItems / hospitalsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      let btn = document.createElement("button");
      btn.textContent = i;
      btn.style.margin = "0 5px";
      btn.style.padding = "5px 10px";
      btn.style.cursor = "pointer";
      btn.style.borderRadius = "5px";
      btn.style.border = i === page ? "2px solid hsla(182, 96%, 30%, 1.00)" : "1px solid #ccc";
      btn.style.background = i === page ? "hsla(182, 96%, 28%, 1.00)" : "#fff";
      btn.style.color = i === page ? "#fff" : "#000";

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });

      paginationContainer.appendChild(btn);
    }
  }

  renderPage(currentPage);
}

// Filter hospitals
function filterHospitals() {
  var query = document.getElementById("searchBar").value.toLowerCase();
  var state = document.getElementById("stateFilter").value;
  var city = document.getElementById("cityFilter").value;

  var filtered = hospitals.filter(h => 
    (!query || h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query) ||
     h.state.toLowerCase().includes(query) || (h.contact && h.contact.toLowerCase().includes(query)) ||
     h.description.toLowerCase().includes(query)) &&
    (!state || h.state === state) &&
    (!city || h.city === city)
  );
  displayHospitals(filtered);
}

// Initial population
populateCities();
displayHospitals(hospitals);

// Event listeners
document.getElementById("searchBar").addEventListener("keyup", filterHospitals);
document.getElementById("stateFilter").addEventListener("change", function() {
  populateCities();
  filterHospitals();
});
document.getElementById("cityFilter").addEventListener("change", filterHospitals);
function toggleDetails(btn) {
  const card = btn.closest('.hospital-card');
  const extra = card.querySelector('.hospital-extra');

  if (extra.style.display === "block") {
    extra.style.display = "none";
    btn.textContent = "View Details";
  } else {
    extra.style.display = "block";
    btn.textContent = "Hide Details";
  }
}
