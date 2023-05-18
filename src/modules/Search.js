import $ from "jquery";

class Search {
  //1. describe/create object
  constructor() {
    this.searchButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.searchResult = $("#search-overlay__results");
    this.typingTimer;
    this.SpinnerVisibility = false;
    this.previousValue;
    this.events();
  }

  //2. events/respond
  events() {
    this.searchButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeoverlay.bind(this));
    $(document).on("keyup", this.escKey.bind(this));
    this.searchField.on("keyup", this.searchType.bind(this));
  }

  //3. function/action
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
  }

  closeoverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }
  escKey(e) {
    if (e.keyCode == 27) {
      this.closeoverlay();
    }
  }

  searchType() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.SpinnerVisibility) {
          this.searchResult.html('<div class="spinner-loader"></div>');
          this.SpinnerVisibility = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.searchResult.html(" ");
        this.SpinnerVisibility = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {}
}

export default Search;
