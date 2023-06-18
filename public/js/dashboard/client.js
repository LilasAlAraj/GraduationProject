(() => {
    "use strict";
    feather.replace({ "aria-hidden": "true" });
})();

$(document).ready(function () {
    // جلب البيانات من ملف JSON
    $.ajax({
        url: "http://127.0.0.1:8000/recommendations/all",
        type: "get",
        success: function (response) {
            console.log(response);
            data = response.recommendations;
            // تحديث Pagination
            displayAll();

            document.getElementById("content").style.display = "block";
            document.getElementById("spinner").style.display = "none";
        },
        error: function (response) {
            console.log(response);
        },
    });
});
function search() {
    $("#search").validate({
        rules: {
            toSearch: {
                required: true,
            },
        },
        messages: {
            toSearch: {
                required: "الرجاء إدخال ما تريد البحث عنه",
            },
        },
        submitHandler: function (form) {

            document.getElementById("content").style.display = "none";
            document.getElementById("spinner").style.display = "flex";
            // جلب البيانات من ملف JSON
            let toSearch = $("#toSearch").val();
            $.ajax({
                url: "http://127.0.0.1:8000/recommendations/ir/search",
                type: "get",
                data: { "toSearch": toSearch },
                success: function (response) {
                    console.log(response);
                    recs = response.recommendations;
                    const recommendations =
                        document.getElementById("recommendations");
                    recommendations.innerText = "";

                    if (recs.length == 0) {
                        recommendations.append("لا يوجد بيانات");
                    } else {
                        for (var i = 0; i < recs.length; i++) {
                            const Recommendation = recs[i];
                            addRecommendationRow(
                                recommendations,
                                Recommendation
                            );
                        }
                    }
                    document.getElementById("content").style.display = "block";
                    document.getElementById("spinner").style.display = "none";
                },
                error: function (response) {
                    console.log(response);
                },
            });
        },
    });
}

function displayAll() {
    // عرض الصفوف
    const recommendations = document.getElementById("recommendations");
    recommendations.innerText = "";

    if (data.length == 0) {
        recommendations.append("لا يوجد بيانات");
    } else {
        for (var i = 0; i < data.length; i++) {
            const Recommendation = data[i];
            addRecommendationRow(recommendations, Recommendation);
        }
    }
}

function addRecommendationRow(recommendations, Recommendation) {
    card_header = document.createElement("div");
    card_header.classList.add("card-header");
    const recommendationTitle = document.createElement("span");
    recommendationTitle.innerHTML = (HighlightText(Recommendation.title))
    card_header.append(recommendationTitle);

    card_body = document.createElement("div");
    card_body.classList.add("card-body");

    content_text = Recommendation.content;
    const recommendationContent = document.createElement("span");
    content = document.createElement("p");
    if (content_text.length > 1000) {
        content_text = content_text.substring(0, 1000) + "... ";
        show_more = document.createElement("b");
        show_more.innerText = "اعرض المزيد.";
        show_more.classList.add("show_more");
        show_more.setAttribute("data-bs-toggle", "modal");
        show_more.setAttribute("data-bs-target", "#recommendationBackdrop");
        show_more.onclick = function () {
            show_more_recommendation(
                HighlightText(Recommendation.title),
                HighlightText(Recommendation.content)
            );
        };
        recommendationContent.innerHTML = (HighlightText(content_text.substring(0,1000)))
        content.append(recommendationContent, show_more);
    } else {
        recommendationContent.innerHTML = (HighlightText(content_text))

        content.append(recommendationContent);
    }
    card_body.append(content);

    card = document.createElement("div");
    card.classList.add("row", "card", "mb-3");

    card.append(card_header, card_body);
    recommendations.append(card);
}

function show_more_recommendation(title, content) {
    document.getElementById("recommendationBackdropLabel").innerHTML = title;
    document.getElementById("recommendationBackdropContent").innerHTML =
        content;
}

function HighlightText(text) {
    let highlightText = "";

    query = document.getElementById("toSearch").value;
    queryWords = []
    if (query !== '')
        queryWords = query.split(" ");

    textWords = []
    if (text !== '')
        textWords = text.split(" ");

    for (var i = 0; i < textWords.length; i++) {
        tWord = textWords[i];
        for (var j = 0; j < queryWords.length; j++) {
            qWord = queryWords[j];

            if (tWord === qWord) {
                tWord = '<span class="highlight">' + tWord + "</span> ";
                break;
            }
        }
        highlightText += tWord + " ";
    }

    return highlightText;
}
