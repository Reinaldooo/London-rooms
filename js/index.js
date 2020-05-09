const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let originalData = null;
let data = null;
let lastFilter = "";
let featMarkers = {};
let featCount = 0;
let numDays = null;
const roomsContainer = document.querySelector("#all-rooms");
const featRoomsContainer = document.querySelector("#feat-rooms");

const markers = [
  {
    id: 1,
    lat: 51.508606,
    lon: -0.126289,
  },
  {
    id: 2,
    lat: 51.507006,
    lon: -0.125117,
  },
  {
    id: 3,
    lat: 51.508415,
    lon: -0.12339,
  },
  {
    id: 4,
    lat: 51.50933,
    lon: -0.121748,
  },
  {
    id: 5,
    lat: 51.510351,
    lon: -0.119038,
  },
  {
    id: 6,
    lat: 51.512506,
    lon: -0.105305,
  },
  {
    id: 7,
    lat: 51.511878,
    lon: -0.10667,
  },
  {
    id: 8,
    lat: 51.519795,
    lon: -0.138449,
  },
  {
    id: 9,
    lat: 51.520636,
    lon: -0.147461,
  },
  {
    id: 10,
    lat: 51.51609,
    lon: -0.150755,
  },
  {
    id: 11,
    lat: 51.517085,
    lon: -0.138806,
  },
  {
    id: 12,
    lat: 51.497336,
    lon: -0.137397,
  },
  {
    id: 13,
    lat: 51.493889,
    lon: -0.128986,
  },
  {
    id: 14,
    lat: 51.490963,
    lon: -0.13773,
  },
  {
    id: 15,
    lat: 51.501929,
    lon: -0.102897,
  },
  {
    id: 16,
    lat: 51.501922,
    lon: -0.098638,
  },
  {
    id: 17,
    lat: 51.500841,
    lon: -0.102445,
  },
  {
    id: 18,
    lat: 51.499021,
    lon: -0.093296,
  },
  {
    id: 19,
    lat: 51.497084,
    lon: -0.098188,
  },
  {
    id: 20,
    lat: 51.495995,
    lon: -0.104411,
  },
  {
    id: 21,
    lat: 51.498653,
    lon: -0.109388,
  },
  {
    id: 22,
    lat: 51.498079,
    lon: -0.112961,
  },
  {
    id: 23,
    lat: 51.508117,
    lon: -0.105065,
  },
  {
    id: 24,
    lat: 51.51191,
    lon: -0.107672,
  },
];

const filterBy = (arr, filter, updatingTotal) => {
  console.log(arr, "arr")
  if (filter === lastFilter && !updatingTotal) return;
  lastFilter = filter;
  let newArr;
  if (filter.startsWith("rat")) {
    // Sort top to bottom if its rating or ratingCount
    newArr = arr.sort((a, b) => a[filter] < b[filter]);
  } else {
    newArr = arr.sort((a, b) => a[filter] > b[filter]);
  }
  roomsContainer.innerHTML = "";
  console.log(newArr, "new")
  newArr.forEach(renderNormalCard);
};

function days_between(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);
  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}

function updateCardsTotal(arr, num) {
  // update num to one if it is zero
  num = num ? num : 1;
  numDays = num;
  if (lastFilter) {
    filterBy(data, lastFilter, true);
    return;
  }
  roomsContainer.innerHTML = "";
  arr.forEach(renderNormalCard);
}

const renderNormalCard = (card) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
  <div class="card__img">
      <img src="${card.photo}" alt="${card.name}">
  </div>
  <div class="card__header flex-spcbtw">
    <span class="card__type text-12">${card.property_type}</span>
    <span class="card__rating">
      <i class="fas fa-star"></i> ${card.rating}
      <span class="card__type text-12"> (${card.ratingCount})</span>
    </span>
  </div>
  <div class="card__name">
    ${card.name}
  </div>
  <div class="card__price flex-spcbtw">
    <span class="price-night">
      R$ ${card.price} / Noite
    </span>
    <span class="price-total">
      ${numDays ? `Total: R$ ${card.price * numDays}` : ""}
    </span>
  </div>
`;
  roomsContainer.appendChild(div);
};

const init = () => {
  originalData.forEach((i, idx) => {
    i.rating = (Math.random() + 4).toFixed(1);
    i.ratingCount = (Math.random() * 102).toFixed();
    i.coords = markers[idx];
  });
  
  flatpickr("#datepicker", {
    mode: "range",
    locale: "pt",
    dateFormat: "d-m-Y",
    onClose: function (selected) {
      updateCardsTotal(data, days_between(selected[0], selected[1]));
    },
  });
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

  originalData.forEach(({ coords, price }, idx) => {
    let mkr = L.marker(
      { lat: coords.lat, lon: coords.lon },
      {
        riseOnHover: true,
        id: coords.id,
      }
    );
    mkr.addTo(mymap).bindTooltip(`<b>R$ ${price}</b>`);
    mkr.on("click", () => mymap.panTo(coords));
    // save 4 markers for featured rooms
    if (idx < 4) {
      featMarkers[`marker${idx}`] = mkr;
    }
  });
  
  const renderFeatCard = (card) => {
    const div = document.createElement("div");
    div.className = "featured__room";
    div.innerHTML = `
    <img src="${card.photo}" alt="${card.name}" class="featured__img">
    <div class="featured__room__medal flex-center">
      <i class="fas fa-medal"></i>
    </div>
    <div class="featured__room__score flex-center">
      <i class="fas fa-star"></i> ${card.rating}
    </div>
  `;
    let item = `marker${featCount}`;
    div.addEventListener("click", () =>
      mymap.panTo({
        lat: card.coords.lat,
        lon: card.coords.lon,
      })
    );
    div.addEventListener("mouseenter", () => featMarkers[item].openTooltip());
    div.addEventListener("mouseleave", () => featMarkers[item].closeTooltip());
    featCount++;
    featRoomsContainer.appendChild(div);
  };

  let buttons = document.querySelectorAll(".sort-by__button");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      // Remove 'selected' class from other buttons
      buttons.forEach((b) => b.classList.remove("button-selected"));
      // Add it to current button
      btn.classList.add("button-selected");
      filterBy(data, btn.dataset.type);
    })
  );

  originalData.slice(0, 4).forEach(renderFeatCard);
  paginationHandler.renderPage()
}

const renderPageButtons = (page) => {
  const checkPageNum = (num) => (page === num ? "pages__button--selected" : "");
  const checkDisabled = (num) => (page === num ? "disabled" : "");
  const section = document.querySelector("#pages");
  section.innerHTML = `
  <button
    class="pages__button pages__button--arrow"
    ${checkDisabled(1)}
    onclick="paginationHandler.setPrevPage()"
  >
    <i class="fas fa-arrow-circle-left"></i>
  </button>
  <button class="pages__button ${checkPageNum(1)}"
    onclick="paginationHandler.goToPage(1)"
  >
    1
  </button>
  <button class="pages__button ${checkPageNum(2)}"
    onclick="paginationHandler.goToPage(2)"
  >
    2
  </button>
  <button class="pages__button ${checkPageNum(3)}"
    onclick="paginationHandler.goToPage(3)"
  >
    3
  </button>
  <button
    class="pages__button pages__button--arrow"
    ${checkDisabled(3)}
    onclick="paginationHandler.setNextPage()"
  >
    <i class="fas fa-arrow-circle-right"></i>
  </button>
`;
};

const paginationHandler = {
  page: 0,
  setNextPage: function() {
    // this.page++
    // data = originalData.slice(this.page*8, (this.page*8)+8)
    // filterBy(data, "price");
    // renderPageButtons(this.page + 1)
  },
  setPrevPage: function() {
    // this.page--
    // data = originalData.slice(this.page*8, (this.page*8)+8)
    // filterBy(data, "price");
    // renderPageButtons(this.page + 1)
  },  
  renderPage: function(page) {
    if (page) {
      this.page = page-1
    }
    data = originalData.slice(this.page*8, (this.page*8)+8)
    filterBy(data, "price");
    renderPageButtons(this.page + 1)
  },
  renderInitial: function() {
    document.querySelector(".app").classList.remove("hidden")
    document.querySelector(".loader").classList.add("hidden")
    init()
  },
}

async function fetchRooms() {
  let response =  await fetch(apiUrl)
  return await response.json()
}

async function main() {
  originalData = await fetchRooms();
  if(originalData) {
    paginationHandler.renderInitial()
  }
}

main();