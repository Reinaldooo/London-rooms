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
    onclick="paginationHandler.renderPage(1, null, true)"
  >
    1
  </button>
  <button class="pages__button ${checkPageNum(2)}"
    onclick="paginationHandler.renderPage(2, null, true)"
  >
    2
  </button>
  <button class="pages__button ${checkPageNum(3)}"
    onclick="paginationHandler.renderPage(3, null, true)"
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
  // Page start with 0 just to facilitate the .slice below
  page: 0,
  setNextPage() {
    this.page++
    this.renderPage()
  },
  setPrevPage() {
    this.page--
    this.renderPage()
  },  
  renderPage(page, filter, noFilter) {
    if (filter === lastFilter) return;
    if (page-1 === this.page && noFilter) return;
    if (page) this.page = page-1;
    if (!filter) filter = lastFilter;
    // dataToShow = originalData.slice(this.page*8, (this.page*8)+8)
    let filtered = filterBy(originalData, filter);
    printCards(filtered.slice(this.page*8, (this.page*8)+8))
    renderPageButtons(this.page + 1)
  },
  renderInitial() {
    document.querySelector(".app").classList.remove("hidden")
    document.querySelector(".loader").classList.add("hidden")
    init()
  },
}