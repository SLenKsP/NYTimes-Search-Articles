var searchedText = "";
var nums;
var startYear;
var endYear;
var apiKey;
var queryUrl;
console.log("current text" + searchedText);
$(document).ready(function() {
  $("#searchBtn").click(function(e) {
    e.preventDefault();
    searchedText = $("#search_term").val();
    nums = $("#num_of_records").val();
    startYear = $("#start_year")
      .val()
      .toString();
    endYear = $("#end_year")
      .val()
      .toString();
    console.log(searchedText);
    console.log(nums);
    console.log(startYear);
    console.log(endYear);
    if (searchedText === "") {
      alert("Enter required fields");
    } else {
      nytimesRtn();
    }

    clearFn();
  });
  var clearFn = function() {
    $("#clear").click(function(e) {
      e.preventDefault();
      $("input[type='text']").val("");
      $("input[type='number']").val("");
      $(".article").empty();
      $("#topArticles hr").remove();
    });
  };
  var nytimesRtn = function() {
    var beginDate = startYear + "0101";
    console.log(beginDate);
    var endDate = endYear + "1231";
    console.log(endDate);
    apiKey = "M7K7JmRxGczz6LEtiowoK0hL4qlXMOBA";
    queryUrl =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      searchedText +
      "&begin_date=" +
      beginDate +
      "&end_date=" +
      endDate +
      "&api-key=" +
      apiKey;
    console.log(queryUrl);
    $.ajax({
      type: "GET",
      url: queryUrl
    }).then(function(response) {
      console.log(response.response.docs);
      var rtnObj = response.response.docs;
      var availableLength = rtnObj.length;
      console.log(availableLength);

      for (var i = 0; i < availableLength; i++) {
        var headline = rtnObj[i].headline.main;
        var showArticleDiv = $("<div class = 'article'>");
        showArticleDiv.text(headline);
        $("#topArticles").append(showArticleDiv, "<hr class= 'separate'>");
      }
    });
  };
});
