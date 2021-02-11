
const printCards = (cards) => {
  roomsContainer.innerHTML = "";
  cards.forEach(renderNormalCard);
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

const renderFeatCard = (card, mymap) => {
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