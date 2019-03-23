$("#search").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#searchTerms").val().trim();
    var startYear = $("#startYear").val().trim() + "0101";
    console.log(searchTerm);
    var endYear = $("#endYear").val().trim() + "1231";
    console.log(startYear);
    console.log(endYear);
    console.log($("#exampleFormControlSelect1").val())

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=GB1M5PxcGWezURcUqTX4VLlc8vnvAIES";
    if (startYear.length === 8) {
        queryURL = queryURL + "&begin_date=" + startYear
    }
    if (endYear.length === 8) {
        queryURL += "&end_date" + endYear
    }
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var results = response.response.docs;
        console.log(results);
        var articleList = $("<ol>")
        for (var i = 0; i < $("#exampleFormControlSelect1").val(); i++) {
            var articleItem = $("<li>");
            var title = $("<p>").text(results[i].headline.main);
            var author = $("<p>").text(results[i].byline.original);
            title.addClass("btn");
            author.addClass("btn");
            articleItem.append(title);
            articleItem.append(author);
            articleList.append(articleItem)
        }
        $("#article-container").html(articleList);
    })

    $("#clear").on("click", function(event) {
        console.log("In clear")
        event.preventDefault();
        $("#article-container").empty();
    })
});