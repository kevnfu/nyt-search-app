function addResultCard(title, author, snippet, date, url) {
    $("#results").append($(
        `
        <div class="card mb-3">
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
                <p class="card-text">
                    By: ${author}<br>
                    Snippet: ${snippet}<br>
                    ${date}<br>
                </p>
                <a class="card-link" href="${url}">${url}</a>
            </div>
        </div>
        `
    ));
}

$(document).on("click", "#submit-btn", function(e) {
    e.preventDefault();
    let term = $("#term").val();
    let num = $("#records-select").find(":selected").val();
    let start = $("#start-year").val();
    let end = $("#end-year").val();

    console.log(term + " " + num + " " + start + " " + end);
    $("#results").empty();
    search(term, num, start, end);
});

$(document).on("click", "#clear-btn", function(e) {
    $("#results").empty();
});

function formatDate(d) {
    return d + "0101";
}

function search(searchTerm, number, start, end){

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e4fc1d91deb54638883811b44d2981c8&q=" + searchTerm;
    if(start !== "") {
        queryURL += "&begin_date=" + formatDate(start);
    }

    if(end !== "") {
        queryURL +="&end_date=" + formatDate(end);
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        var results = response.response.docs;

        if(number > results.length) number = results.length;

        for (i=0; i<number; i++){
            console.log(results[i]);
            let byline = "byline" in results[i] ? results[i].byline.original : "unknown";
            addResultCard(results[i].headline.main, byline, results[i].snippet, results[i].pub_date, results[i].web_url);
        }
        
    })
}