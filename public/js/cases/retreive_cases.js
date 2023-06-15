(() => {
    "use strict";

    feather.replace({ "aria-hidden": "true" });
})();

$(document).ready(function () {
    // var table = document.getElementsByClassName("table")[0];

    // if (table.rows.length == 1) {

    //     var headerRow = table.rows[0];
    //     var numColumns = headerRow.cells.length;
    //     var row = table.insertRow(1);
    //     var cell = row.insertCell(0);
    //     cell.colSpan = numColumns;
    //     cell.innerHTML = "لا يوجد بيانات";

    // }
    fillYears();

    document.getElementById("content").style.display = "block";
    document.getElementById("spinner").style.display = "none";
});

/********************* */

let data;
let currentData;

function displayAll() {
    showPage(1, currentData);
    // if (currentData.length != 0) {
    //     document.getElementById("casesControllerContainer").innerHTML =
    //         '<nav aria-label="Page navigation example" class="row">' +
    //         '<ul id="pagination" class="pagination"></ul>' +
    //         "</nav>" +
    //         '<button style="height: 100%;" id="reverse-btn" type="button" data-display="asc"' +
    //         'class="operations-btn btn" onclick="reverseData()">' +
    //         '<span data-feather="refresh-cw" class="align-text-bottom"></span>' +
    //         "عرض تنازلي" +
    //         "</button>";
    //     updatePagination(currentData);
    // }
}

function retreive() {
    $("#retreive-form").validate({
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
            $(".error").html();
            var toSearch = $("#toSearch").val();
            var from_year = $("#from_year").val();
            var to_year = $("#to_year").val();

            let from = new Date(from_year).getTime();
            let to = new Date(to_year).getTime();

            if (from > to) {
                $(".error").html("الرجاء اختيار التواريخ بشكل صحيح");
            } else {
                document.getElementById("content").style.display = "none";
                document.getElementById("spinner").style.display = "flex";
                $.ajax({
                    url: "http://127.0.0.1:8000/cases/ir/search",
                    type: "get",
                    data: {
                        toSearch: toSearch,
                        from_year: from_year,
                        to_year: to_year,
                    },
                    success: function (response) {


                        console.log(response)

                        currentData = data = response.cases;
                        // تحديث Pagination
                        displayAll();
                        document.getElementById("content").style.display =
                            "block";
                        document.getElementById("spinner").style.display =
                            "none";
                    },
                    error: function (response) {

                        document.getElementById("content").style.display =
                            "block";
                        document.getElementById("spinner").style.display =
                            "none";
                    },
                });
            }
        },
    });
}

var currentPageGlobally = 1;

// تحديث Pagination بعد تحديد الفترة الزمنية
function updatePagination(data) {
    // إزالة Pagination الحالي
    $("#pagination").empty();

    // إنشاء Pagination جديد
    var itemsPerPage = 10;
    var totalPages = Math.ceil(data.length / itemsPerPage);

    // show up to 5 pages
    var maxPagesToShow = 5;
    var startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPageGlobally <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (
            currentPageGlobally + Math.floor(maxPagesToShow / 2) >=
            totalPages
        ) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPageGlobally - Math.floor(maxPagesToShow / 2);
            endPage = currentPageGlobally + Math.floor(maxPagesToShow / 2);
        }
    }

    // إضافة زر السابق

    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");

    const prevLiChild = document.createElement("a");
    prevLiChild.classList.add("page-link");

    prevLiChild.onclick = function () {
        if (currentPageGlobally > 1) {
            currentPageGlobally--;
            updatePagination(currentData, currentPageGlobally);
        }
    };

    prevLiChild.innerHTML = "«";

    prevLi.appendChild(prevLiChild);
    if (currentPageGlobally === 1) {
        prevLi.classList.add("disabled");
    }

    $("#pagination").append(prevLi);
    for (var i = startPage; i <= endPage; i++) {
        const currentPage = i; // تخزين القيمة الحالية لـ i

        const li = document.createElement("li");
        li.classList.add("page-item");

        const liChild = document.createElement("a");
        liChild.classList.add("page-link");
        li.setAttribute("page", currentPage);

        liChild.onclick = function () {
            currentPageGlobally = li.getAttribute("page");

            updatePagination(currentData, currentPageGlobally);
        };

        liChild.innerHTML = currentPage;

        li.appendChild(liChild);

        $("#pagination").append(li);

        if (i === currentPageGlobally) {
            li.classList.add("active");
        }
    }

    // إضافة زر next

    const nextLi = document.createElement("li");
    nextLi.classList.add("page-item");

    const nextLiChild = document.createElement("a");
    nextLiChild.classList.add("page-link");

    nextLiChild.onclick = function () {
        if (currentPageGlobally < totalPages) {
            currentPageGlobally++;
            updatePagination(currentData, currentPageGlobally);
        }
    };

    nextLiChild.innerHTML = "»";

    nextLi.appendChild(nextLiChild);
    $("#pagination").append(nextLi);

    if (currentPageGlobally === totalPages) {
        nextLi.classList.add("disabled");
    }

    // عرض الصفحة الحالية من الجدول
    showPage(currentPageGlobally, currentData);

    // عند النقر على أزرار الانتقال ثم اختيار الصفحة المناسبة وتلوينها
    const pi = $("#pagination .page-item");

    for (var i = 0; i < pi.length; i++) {
        if (currentPageGlobally === pi[i].getAttribute("page"))
            pi[i].classList.add("active");
    }
}

// عرض الصفحة المحددة من الجدول
function showPage(pageNumber, data) {
    // حساب الصفوف التي يجب عرضها
    var itemsPerPage = 10;
    var startIndex = (pageNumber - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, data.results.length);

    if (data.suggestions.length != 0) {
        document.getElementById("do-you-mean").innerHTML = "هل تقصد: ";
        n = data.suggestions.length;
        for (var i = 0; i < n; i++) {
            mean = document.createElement("span");
            mean.innerHTML = data.suggestions[i];
            mean.classList.add("mean");

            document.getElementById("means").append(mean);
            if (i < n - 1) document.getElementById("means").append("،");
            else document.getElementById("means").append(".");
        }
    }
    const retreivedCases = document.getElementById("retreivedCases");
    retreivedCases.innerHTML = "";
    if (data.results.length == 0) {
        retreivedCases.innerHTML = "لا يوجد بيانات حول ما تبحث عنه";

        document.getElementById("casesControllerContainer").innerHTML = "";
    } else {
        for (var i = startIndex; i < endIndex; i++) {


            const Case = data.results[i].result;


            // console.log(Case.claim)
            // if (data.results[i].highlight != null && data.results[i].highlight.claim != null) {

            //     cl = '';
            //     for (j = 0; j < data.results[i].highlight.claim.length; j++)
            //         cl += data.results[i].highlight.claim[j]
            //     console.log(cl)

            // }

            const CaseCard = document.createElement("div");
            CaseCard.classList.add("row", "card", "mb-3");

            //ضبط ادعاء القضية
            const CaseCardHeader = document.createElement("div");
            CaseCardHeader.classList.add("card-header");
            const title = document.createElement("span");
            title.classList.add("caseTitle");

            title.innerHTML = HighlightText(Case.title);
            title.title = "انقر لعرض القضية وتفاصيلها بشكل كامل";
            title.onclick = function () {
                viewCase(Case.id);
            };

            const evaluation = document.createElement("span");
            evaluation.innerHTML = "evaluation= " + data.results[i].evaluation;

            const header = document.createElement("div");
            header.classList.add("d-flex", "justify-content-between");
            header.append(title, evaluation);

            CaseCardHeader.append(header);

            const CaseCardBody = document.createElement("div");
            CaseCardBody.classList.add("card-body");

            const Accordion = document.createElement("div");
            Accordion.id = "accordionCase" + i;
            Accordion.classList.add("accordion");

            //ضبط وقائع القضية
            const fact_text = Case.facts;

            const fact_text_content = document.createElement("p");
            if (fact_text.length > 900) {
                const show_more_fact = document.createElement("b");
                show_more_fact.innerText = "اعرض المزيد.";
                show_more_fact.classList.add("show_more");
                show_more_fact.setAttribute("data-bs-toggle", "modal");
                show_more_fact.setAttribute(
                    "data-bs-target",
                    "#showMoreBackdrop"
                );
                show_more_fact.onclick = function () {
                    ShowMoreFacts("وقائع القضية", HighlightText(fact_text), i);
                };

                fact_text_content.innerHTML = HighlightText(
                    fact_text.substring(0, 900) + "... "
                );
                fact_text_content.appendChild(show_more_fact);
            } else {
                fact_text_content.innerHTML = HighlightText(fact_text);
            }

            const FactAccordionItem = document.createElement("div");
            FactAccordionItem.classList.add("accordion-item");
            accordion_header = document.createElement("h2");
            accordion_header.classList.add("accordion-header");
            accordion_button = document.createElement("button");
            accordion_button.classList.add("accordion-button", "collapsed");
            accordion_button.type = "button";
            accordion_button.setAttribute("aria-expanded", "false");
            accordion_button.setAttribute(
                "aria-controls",
                "collapseFacts-" + i
            );
            accordion_button.setAttribute("data-bs-toggle", "collapse");
            accordion_button.setAttribute(
                "data-bs-target",
                "#collapseFacts-" + i
            );

            accordion_button.innerHTML = "الوقائع";
            accordion_header.append(accordion_button);

            accordion_collapse = document.createElement("div");
            accordion_collapse.id = "collapseFacts-" + i;
            accordion_collapse.classList.add("accordion-collapse", "collapse");
            accordion_collapse.setAttribute(
                "data-bs-parent",
                "#accordionCase" + i
            );
            accordion_body = document.createElement("div");
            accordion_body.classList.add("accordion-body");
            accordion_body.append(fact_text_content);
            accordion_collapse.append(accordion_body);
            FactAccordionItem.append(accordion_header, accordion_collapse);
            Accordion.append(FactAccordionItem);

            //ضبط التماس القضية
            const claim_text = Case.claim;
            const claim_text_content = document.createElement("p");
            if (claim_text.length > 900) {
                const show_more_claim = document.createElement("b");
                show_more_claim.innerText = "اعرض المزيد.";
                show_more_claim.classList.add("show_more");
                show_more_claim.setAttribute("data-bs-toggle", "modal");
                show_more_claim.setAttribute(
                    "data-bs-target",
                    "#showMoreBackdrop"
                );
                show_more_claim.onclick = function () {
                    ShowMoreClaim(
                        "التماس القضية",
                        HighlightText(claim_text),
                        i
                    );
                };

                claim_text_content.innerHTML = HighlightText(
                    claim_text.substring(0, 900) + "... "
                );
                claim_text_content.append(show_more_claim);
            } else {
                claim_text_content.innerHTML = HighlightText(claim_text);
            }
            const ClaimAccordionItem = document.createElement("div");
            ClaimAccordionItem.classList.add("accordion-item");
            accordion_header = document.createElement("h2");
            accordion_header.classList.add("accordion-header");
            accordion_button = document.createElement("button");
            accordion_button.classList.add("accordion-button", "collapsed");
            accordion_button.type = "button";
            accordion_button.setAttribute("aria-expanded", "false");
            accordion_button.setAttribute(
                "aria-controls",
                "collapseClaims-" + i
            );
            accordion_button.setAttribute("data-bs-toggle", "collapse");
            accordion_button.setAttribute(
                "data-bs-target",
                "#collapseClaims-" + i
            );
            accordion_button.innerHTML = "الالتماس";
            accordion_header.append(accordion_button);

            accordion_collapse = document.createElement("div");
            accordion_collapse.id = "collapseClaims-" + i;
            accordion_collapse.classList.add("accordion-collapse", "collapse");
            accordion_collapse.setAttribute(
                "data-bs-parent",
                "#accordionCase" + i
            );
            accordion_body = document.createElement("div");
            accordion_body.classList.add("accordion-body");
            accordion_body.append(claim_text_content);
            accordion_collapse.append(accordion_body);
            ClaimAccordionItem.append(accordion_header, accordion_collapse);
            Accordion.append(ClaimAccordionItem);

            // ضبط قرارات القضية
            const decisionTable = document.createElement("table");
            thead = document.createElement("thead");
            thead.style.textAlign = "right";
            theadTR = document.createElement("tr");
            theadTRTH1 = document.createElement("th");
            theadTRTH1.innerHTML = "#";
            theadTRTH2 = document.createElement("th");
            theadTRTH2.innerHTML = "القرار";
            theadTR.append(theadTRTH1, theadTRTH2);
            thead.append(theadTR);
            decisionTable.append(thead);
            decisionTable.classList.add(
                "table",
                "table-bordered",
                "table-striped"
            );
            const decisionsBody = document.createElement("tbody");
            var j = 1;
            for (const decisionID in Case.decisions) {
                if (Case.decisions.hasOwnProperty(decisionID)) {
                    const decision_text = Case.decisions[decisionID];
                    const decision_text_content = document.createElement("p");
                    if (decision_text.length > 500) {
                        let show_more_decision = document.createElement("b");
                        show_more_decision.innerText = "اعرض المزيد.";
                        show_more_decision.classList.add("show_more");
                        show_more_decision.setAttribute(
                            "data-bs-toggle",
                            "modal"
                        );
                        show_more_decision.setAttribute(
                            "data-bs-target",
                            "#showMoreBackdrop"
                        );
                        show_more_decision.id =
                            "showMoreDecision" + i + "-" + j;
                        show_more_decision.addEventListener(
                            "click",
                            function () {
                                ShowMoreDecision(
                                    "قرار القضية",
                                    HighlightText(decision_text)
                                );
                            }
                        );

                        decision_text_content.innerHTML = HighlightText(
                            decision_text.substring(0, 500) + "... "
                        );
                        decision_text_content.append(show_more_decision);
                    } else {
                        decision_text_content.innerHTML =
                            HighlightText(decision_text);
                    }
                    const row = document.createElement("tr");
                    const numCol = document.createElement("td");
                    numCol.innerHTML = j++;
                    numCol.style.fontWeight = "bold";
                    const decisionTextCol = document.createElement("td");
                    decisionTextCol.append(decision_text_content);
                    row.append(numCol, decisionTextCol);
                    decisionsBody.append(row);
                }
            }

            decisionTable.append(decisionsBody);

            const DecisionAccordionItem = document.createElement("div");
            DecisionAccordionItem.classList.add("accordion-item");
            accordion_header = document.createElement("h2");
            accordion_header.classList.add("accordion-header");
            accordion_button = document.createElement("button");
            accordion_button.classList.add("accordion-button", "collapsed");
            accordion_button.type = "button";
            accordion_button.setAttribute("aria-expanded", "false");
            accordion_button.setAttribute(
                "aria-controls",
                "CollapseDecision-" + i
            );
            accordion_button.setAttribute("data-bs-toggle", "collapse");
            accordion_button.setAttribute(
                "data-bs-target",
                "#CollapseDecision-" + i
            );
            accordion_button.innerHTML = "القرارات";
            accordion_header.append(accordion_button);

            accordion_collapse = document.createElement("div");
            accordion_collapse.id = "CollapseDecision-" + i;
            accordion_collapse.classList.add("accordion-collapse", "collapse");
            accordion_collapse.setAttribute(
                "data-bs-parent",
                "#accordionCase" + i
            );
            accordion_body = document.createElement("div");
            accordion_body.classList.add(
                "accordion-body",
                "accordion-body-decisions"
            );
            accordion_body.append(decisionTable);
            accordion_collapse.append(accordion_body);
            DecisionAccordionItem.append(accordion_header, accordion_collapse);
            Accordion.append(DecisionAccordionItem);

            CaseCardBody.append(Accordion);
            CaseCard.append(CaseCardHeader);
            CaseCard.append(CaseCardBody);

            retreivedCases.append(CaseCard);
        }
    }
}

function ShowMoreFacts(title, text, i) {
    document.getElementById("showMoreBackdropLabel").innerHTML = title;
    document.getElementById("showMore-text").innerHTML = text;
}
function ShowMoreClaim(title, text, i) {
    document.getElementById("showMoreBackdropLabel").innerHTML = title;
    document.getElementById("showMore-text").innerHTML = text;
}
function ShowMoreDecision(title, text, i) {
    document.getElementById("showMoreBackdropLabel").innerHTML = title;
    document.getElementById("showMore-text").innerHTML = text;
}

function viewCase(caseId) {
    window.location.href = "http://127.0.0.1:8000/cases/view/" + caseId;
}

function reverseData() {
    let tempCurrentData = [];

    const n = currentData.length - 1;
    for (var i = n; i >= 0; i--) tempCurrentData[n - i] = currentData[i];

    currentData = tempCurrentData;

    currentPageGlobally = 1;
    updatePagination(currentData);
    showPage(currentPageGlobally, currentData);

    btn = document.getElementById("reverse-btn");
    if (btn.getAttribute("data-display") === "asc") {
        btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' +
            "عرض تصاعدي";
        btn.setAttribute("data-display", "desc");
    } else if (btn.getAttribute("data-display") === "desc") {
        btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' +
            "عرض تنازلي";
        btn.setAttribute("data-display", "asc");
    }
}

function HighlightText(text) {
    let highlightText = "";

    query = document.getElementById("toSearch").value;

    queryWords = query.split(" ");

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
function fillYears() {
    const currentDate = new Date();
    // Get the current year
    const currentYear = currentDate.getFullYear();
    document.getElementById("to_year").setAttribute("max", currentYear);
    document.getElementById("to_year").setAttribute("placeholder", currentYear);
    document.getElementById("from_year").setAttribute("max", currentYear - 1);
}
