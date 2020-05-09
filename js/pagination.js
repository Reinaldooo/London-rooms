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
    onclick="paginationHandler.renderPage(1)"
  >
    1
  </button>
  <button class="pages__button ${checkPageNum(2)}"
    onclick="paginationHandler.renderPage(2)"
  >
    2
  </button>
  <button class="pages__button ${checkPageNum(3)}"
    onclick="paginationHandler.renderPage(3)"
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
    this.page++
    this.renderPage()
  },
  setPrevPage: function() {
    this.page--
    this.renderPage()
  },  
  renderPage: function(page, filter) {
    if (page) {
      this.page = page-1
    }
    if (!filter) {
      filter = lastFilter
    }
    // dataToShow = originalData.slice(this.page*8, (this.page*8)+8)
    let filtered = filterBy(originalData, filter);
    printCards(filtered.slice(this.page*8, (this.page*8)+8))
    renderPageButtons(this.page + 1)
  },
  renderInitial: function() {
    document.querySelector(".app").classList.remove("hidden")
    document.querySelector(".loader").classList.add("hidden")
    init()
  },
}