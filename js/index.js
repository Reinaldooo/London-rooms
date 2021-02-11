const apiUrl = "https://api.reinaldowft.com/london-rooms";
let originalData = null;
let dataToShow = null;
let lastFilter = "price";
let featMarkers = {};
let featCount = 0;
let numDays = null;
let apiTimeout = setTimeout(() => {
  document.querySelector(".loader").classList.add("hidden");
  document.querySelector(".error").classList.remove("hidden");
}, 8000);
const roomsContainer = document.querySelector("#all-rooms");
const featRoomsContainer = document.querySelector("#feat-rooms");

const filterBy = (arr, filter) => {
  lastFilter = filter;
  if (filter.startsWith("rat")) {
    // Sort top to bottom if its rating or ratingCount
    return arr.sort((a, b) => a[filter] < b[filter]);
  }
  return arr.sort((a, b) => a[filter] > b[filter]);
};

const handleSelect = () => {
  const select = document.querySelector("select");
  paginationHandler.renderPage(1, select.value);
};

const updateApiImgSize = (img, size) => {
  if (size) {
    let tmp = img.split("=");
    tmp[tmp.length - 1] = size;
    return tmp.join("=");
  }
  return img;
};

function days_between(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);
  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}

function updateCardsTotal(num) {
  // Avoid re-rendering if the number of days is equal
  if (numDays === num) return;
  // update num to one if it is zero
  num = num ? num : 1;
  numDays = num;
  paginationHandler.renderPage();
}

const init = () => {
  // populate apiData with more info
  originalData.forEach((i, idx) => {
    i.rating = (Math.random() + 4).toFixed(1);
    i.ratingCount = Math.round(Math.random() * 102);
    i.coords = markers[idx];
    i.photo = updateApiImgSize(i.photo, "large");
  });
  // flatpickr init
  flatpickr("#datepicker", {
    mode: "range",
    locale: "pt",
    dateFormat: "d-m-Y",
    onClose: function (selected) {
      updateCardsTotal(days_between(selected[0], selected[1]));
    },
  });
  // map init
  let mymap = L.map("map", {
    scrollWheelZoom: false,
  }).setView({ lat: 51.509334, lon: -0.114883 }, 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVpbmFsZG9vbyIsImEiOiJjazl2a3g1ZXAwMDlxM2dvNGJ5M3ZjZDJ3In0.1B7OE0PYPCDADiruf5hh7A",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(mymap);
  // create markers for each room
  originalData.forEach(({ coords, price }, idx) => {
    let mkr = L.marker(coords, {
      riseOnHover: true,
    });
    mkr.addTo(mymap).bindTooltip(`<b>R$ ${price}</b>`);
    mkr.on("click", () => mymap.panTo(coords));
    // save 4 markers for featured rooms
    if (idx < 4) {
      featMarkers[`marker${idx}`] = mkr;
    }
  });
  // init sort-by buttons
  let buttons = document.querySelectorAll(".sort-by__button");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      // Remove 'selected' class from other buttons
      buttons.forEach((b) => b.classList.remove("button-selected"));
      // Add it to current button
      btn.classList.add("button-selected");
      paginationHandler.renderPage(1, btn.dataset.type);
    })
  );

  originalData.slice(0, 4).forEach((card) => renderFeatCard(card, mymap));
  paginationHandler.renderPage();
};

async function fetchRooms() {
  try {
    let response = await fetch(apiUrl);
    return await response.json();
  } catch {
    document.querySelector(".loader").classList.add("hidden");
    document.querySelector(".error").classList.remove("hidden");
  }
}

async function main() {
  originalData = await fetchRooms();
  if (originalData) {
    window.clearTimeout(apiTimeout);
    paginationHandler.renderInitial();
  }
}

main();
