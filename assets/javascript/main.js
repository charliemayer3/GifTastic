$(document).ready(function() {
  
  var originalArray = ["Cats", "Dogs", "Birds", "Pigs"];
  function displayGif() {
    $("#gifs-appear-here").empty();
    var search = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      search + "&api_key=JqMceBQGL7UXgLrqfs3c2wDnZXKdkZYW&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class='animalImage'>")
        var p = $("<p>").text("Rating: " + results[i].rating)
        var animalImage = $("<img>")
        animalImage.attr("data-state", "still")
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalDiv.append(p, animalImage)
        $("#gifs-appear-here").prepend(animalDiv)
      }

      $("img").on("click", function() {
        var state = $(this).attr("data-state")
        console.log(state)
        if(state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })

    });
  };

  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < originalArray.length; i++) {
      var a = $("<button>");
      a.addClass("buttonSearch");
      a.attr("data-search", originalArray[i]);
      a.text(originalArray[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#add-category").on("click", function(event) {
    event.preventDefault();
    var newSearch = $("#user-input").val().trim();
    originalArray.push(newSearch);
    $("#user-form")[0].reset();
    renderButtons();
  });

  $("#buttons-view").on("click", ".buttonSearch", displayGif);
  renderButtons();

})