const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let data = [];
let lastFilter = ''
let numDays = null;
const roomsContainer = document.querySelector("#all-rooms");
const featRoomsContainer = document.querySelector("#feat-rooms");

const fakeApi = [
  {
    "photo": "https://a0.muscache.com/im/pictures/e6c4b347-49c7-4840-8c00-df36a2a273da.jpg?aki_policy=x_large",
    "property_type": "Apartamento",
    "name": "Apartment in Son Parc, wonderful views",
    "price": 433
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/4a5326cb-95e4-4220-a4d8-c91f50cf784c.jpg?aki_policy=xx_large",
    "property_type": "Apartamento",
    "name": "APARTAMENTO IDEAL PAREJAS EN SON PARC",
    "price": 368
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/77a102a4-cf65-475e-be60-4d592307ab4a.jpg?aki_policy=xx_large",
    "property_type": "Casa",
    "name": "Casa Charmosa Bem Localizada",
    "price": 70
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/83de85c5-ce24-4cc4-ae85-dfb2300b4a06.jpg?aki_policy=xx_large",
    "property_type": "Casa",
    "name": "Quartos pertinho do Anhembi!",
    "price": 189
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/d5dbb5b2-12a3-4de5-87d0-5a66841eb731.jpg?aki_policy=xx_large",
    "property_type": "Chácara",
    "name": "Charming Chalet, private pool, free AC & WiFi",
    "price": 737
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/ce7dd48a-8125-4cea-a1b7-27ce0068d5d8.jpg?aki_policy=x_large",
    "property_type": "Chácara",
    "name": "Menorca Green Park C7",
    "price": 520
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/bea86611-2f82-487a-a62e-17ab268515de.jpg?aki_policy=xx_large",
    "property_type": "Chácara",
    "name": "Villa Monty",
    "price": 1291
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/4cfeba0b-a0c3-4ae4-87c9-5e9349608814.jpg?aki_policy=xx_large",
    "property_type": "Estúdio",
    "name": "Bonito penthouse cerca del aeropuerto CDMX",
    "price": 73
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/ac081c48-0161-4cde-a0e6-77b3bd933f94.jpg?aki_policy=xx_large",
    "property_type": "Estúdio",
    "name": "The Backpacker's Retreat - Balcony",
    "price": 51
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/dc72255f-7965-4964-b89e-7bfb9f4aa939.jpg?aki_policy=x_large",
    "property_type": "Estúdio",
    "name": "10min airport, Foro Sol, Palacio de los Deportes",
    "price": 81
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/60f11b07-3aa2-4e03-ac03-6a0c12fbc35b.jpg?aki_policy=x_large",
    "property_type": "Estúdio",
    "name": "Acogedor depto cerca aeropuerto, foro Sol, Centro",
    "price": 77
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/f2379eb0-d77e-4a99-9df5-f16032693f0d.jpg?aki_policy=xx_large",
    "property_type": "Loft",
    "name": "Sol Nascente da Prainha",
    "price": 200
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/5ed611f3-fb3f-489e-b1cb-d5f26ea80c4c.jpg?aki_policy=xx_large",
    "property_type": "Loft",
    "name": "Ap novo com wi-fi na Prainha - Arraial do Cabo",
    "price": 145
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/207ef44d-fbe6-4fcd-9824-91b65de4b3cb.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Suite @ Subway Trianon Masp",
    "price": 69
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/f94985db-d4db-4c10-8b9b-82342746601d.jpg?aki_policy=x_large",
    "property_type": "Quarto",
    "name": "Quarto Arouche Centro SP Ótima Localização",
    "price": 45
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/8b397c47-01af-4476-9fb8-784ab4df2c91.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Quarto 1 - Parque da Aclimacão",
    "price": 55
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/c3c6432f-b140-4768-8d61-c160e639b7a8.jpg?aki_policy=x_large",
    "property_type": "Quarto",
    "name": "Existe amor em SP",
    "price": 55
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/306e0369-ab79-40be-bdb7-c87340dcdbc1.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Confortável quarto de casal px. à Av. Paulista",
    "price": 80
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/f5abd356-8a66-495b-b00b-877e7eae0323.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Room Higienopolis São Paulo",
    "price": 80
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/f1899868-21d0-44c2-b253-8b927821e178.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Confortável quarto solteiro px. à Av. Paulista",
    "price": 80
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/6b46fa03-8ef3-4370-8158-390935279dcf.jpg?aki_policy=xx_large",
    "property_type": "Quarto",
    "name": "Modern, Cozy + all you need! Muito aconchegante!!",
    "price": 66
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/f074bead-ee2d-4c91-a958-2a0360e1ad7c.jpg?aki_policy=xx_large",
    "property_type": "Sítio",
    "name": "Recanto Rosana - Quartos e estrutura completa",
    "price": 39
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/de890df5-1279-481f-989c-97847f8482cd.jpg?aki_policy=xx_large",
    "property_type": "Sítio",
    "name": "Suite na Montanha - Refúgio do Artista",
    "price": 77
  },
  {
    "photo": "https://a0.muscache.com/im/pictures/17b61b71-3b06-4cec-bf8f-f32daea24f39.jpg?aki_policy=xx_large",
    "property_type": "Sítio",
    "name": "Sítio Costa do Sol",
    "price": 100
  }
]

fakeApi.forEach((i) => {
  i.rating = (Math.random() + 4).toFixed(1)
  i.ratingCount = (Math.random() * 102).toFixed()
})

function days_between(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);
  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}

function updateCardsTotal(num) {
  // update num to one if it is zero
  num = num ? num : 1
  numDays = num
  if(lastFilter) {
    filterBy(lastFilter)
    return
  }
  roomsContainer.innerHTML = ""
  fakeApi.forEach(renderNormalCard)
}

flatpickr("#datepicker", { 
  mode: "range",
  "locale": "pt",
  dateFormat: "d-m-Y",
  onClose: function(selected) {
    updateCardsTotal(days_between(selected[0], selected[1]))
  }
});

let mymap = L.map('map', {
  scrollWheelZoom: false
}).setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVpbmFsZG9vbyIsImEiOiJjazl2a3g1ZXAwMDlxM2dvNGJ5M3ZjZDJ3In0.1B7OE0PYPCDADiruf5hh7A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);
// 51.508606, -0.126289
let marker = L.marker({lon: -0.126289, lat: 51.508606}).addTo(mymap);
mymap.panTo({lat: -22.827591, lng: -43.417488, alt: 1000});

const renderNormalCard = (card) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
  <div class="card__img">
      <img src="${card.photo}" alt="${card.photo}">
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
  featRoomsContainer.appendChild(div);
};

[...fakeApi].sort((a,b) => a.rating < b.rating).slice(0,4).forEach(renderFeatCard)
fakeApi.forEach(renderNormalCard)

let buttons = document.querySelectorAll(".sort-by__button")
buttons.forEach((btn) => btn.addEventListener('click', () => {
  // Remove 'selected' class from other buttons
  buttons.forEach((b) => b.classList.remove("selected"))
  // Add it to current button
  btn.classList.add("selected")
  filterBy(btn.dataset.type)
}))

const filterBy = (filter) => {
  lastFilter = filter
  let newArr;
  if(filter.startsWith('rat')) {
    // Sort top to bottom if its rating or ratingCount
    newArr = fakeApi.sort((a,b) => a[filter] < b[filter])    
  } else {
    newArr = fakeApi.sort((a,b) => a[filter] > b[filter])
  }
  roomsContainer.innerHTML = ""
  newArr.forEach(renderNormalCard)
}