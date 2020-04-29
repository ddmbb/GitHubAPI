"use strict";

const searchURL = "https://api.github.com/users/:user/repos";

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>`
    );
  }
  $("#results").removeClass("hidden");
}

function getRepo(query) {
  const queryString = $("#js-search-term").val().toLowerCase();
  const url = `https://api.github.com/users/${queryString}/repos`;

  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    getRepo(searchTerm);
  });
}

$(watchForm);
