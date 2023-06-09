import $ from "jquery";

class Search {
  //1. describe/create object
  constructor() {
    this.addSearchHTML();
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
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 301);
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
        this.typingTimer = setTimeout(this.getResults.bind(this), 300);
      } else {
        this.searchResult.html(" ");
        this.SpinnerVisibility = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    $.getJSON(
      universityData.root_url +
        "/wp-json/university/v1/search?term=" +
        this.searchField.val(),
      (results) => {
        this.resultsDiv.html(`
        <div class="row">
          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>
            ${
              results.generalInfo.length
                ? '<ul class="link-list min-list">'
                : "<p>No general information matches that search.</p>"
            }
              ${results.generalInfo
                .map(
                  (item) =>
                    `<li><a href="${item.permalink}">${item.title}</a> ${
                      item.postType == "post" ? `by ${item.authorName}` : ""
                    }</li>`
                )
                .join("")}
            ${results.generalInfo.length ? "</ul>" : ""}
          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${
              results.programs.length
                ? '<ul class="link-list min-list">'
                : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
            }
              ${results.programs
                .map(
                  (item) =>
                    `<li><a href="${item.permalink}">${item.title}</a></li>`
                )
                .join("")}
            ${results.programs.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Professors</h2>

          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${
              results.campuses.length
                ? '<ul class="link-list min-list">'
                : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`
            }
              ${results.campuses
                .map(
                  (item) =>
                    `<li><a href="${item.permalink}">${item.title}</a></li>`
                )
                .join("")}
            ${results.campuses.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Events</h2>
          </div>
        </div>
      `);
        this.isSpinnerVisible = false;
      }
    );
  }

  addSearchHTML() {
    $("body").append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
                <div class="container">
                    <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                    <input type="text" class="search-term" placeholder="Type here" id="search-term">
                    <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                </div>
            </div>
            <div class="container">
                <div id="search-overlay__results"></div>
            </div>
        </div>
    `);
  }
}

export default Search;
