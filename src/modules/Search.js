import $ from "jquery";

class Search {
  //1. describe/create object
  constructor() {
    this.searchButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
  }

  //2. events/respond
  events() {
    this.searchButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeoverlay.bind(this));
    $(document).on("keyup", this.escKey.bind(this));
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
}

export default Search;
