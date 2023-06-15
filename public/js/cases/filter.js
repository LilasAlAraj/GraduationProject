function allAuth() {
    document.getElementById('displayAllTapAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy active " id="all-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#all-tab-pane" type="button" role="tab"'
        + 'aria-controls="all-tab-pane" aria-selected="true" onclick="displayAll()">'
        + 'عرض الكل'
        + '</button>'
        + '</li>';
    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade show active" id="all-tab-pane" role="tabpanel"'
        + 'aria-labelledby="all-tab" tabindex="0">'
        + '<br>'
        + '</div>');


}
function searchByTitleAuth() {

    document.getElementById('searchByTitleTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-title-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-title-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-title-tab-pane" aria-selected="false">'
        + 'بحث بموضوع الدعوى'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade" id="by-title-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-title-tab" tabindex="0">'
        + '<form id="searchByTitle" class="search-options">'
        + '<div class="row">'
        + '<div class="col-12">'
        + '<label for="title"><b>موضوع الدعوى</b></label>'
        + '<input type="text" id="title" class="searchInput" name="title" required>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByTitle()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"'
        + 'class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');

}
function searchByBaseNumberAuth() {
    document.getElementById('searchByBaseNumberTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-number-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-number-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-number-tab-pane" aria-selected="false">'
        + 'بحث برقم القضية'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += (' <div class="tab-pane fade" id="by-number-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-title-tab" tabindex="0">'
        + '<form id="searchByBaseNumber" class="search-options">'
        + '<div class="row">'
        + '<div class="col-6">'
        + '<label for="base_number"><b>رقم الأساس</b></label>'
        + '<input type="number" class="searchInput" id="base_number" placeholder="أدخل رقم الأساس" name="base_number">'
        + '</div>'
        + '<div class="col-6">'
        + '<label for="year"><b>العام</b></label>'
        + '<select id="year" class="year searchInput" name="year">'
        + '</select>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByBaseNumber()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"'
        + 'class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');
}

function searchByStatusAuth() {
    document.getElementById('searchByStatusTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-state-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-state-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-state-tab-pane" aria-selected="false">'
        + 'بحث بحالة القضية'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade" id="by-state-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-state-tab" tabindex="0">'
        + '<form id="searchByState" class="search-options">'
        + '<div class="row">'
        + '<div class="col-12">'
        + '<label for="state"><b>الحالة</b></label>'
        + '<select id="state" name="state" class="searchInput" required>'
        + '<option value="3" style="color: blue">جارٍ العمل عليها</option>'
        + '<option value="1" style="color: green">رابحة</option>'
        + '<option value="2" style="color: red">خاسرة</option>'
        + '<option value="4" style="color: black">معلقة</option>'
        + '</select>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByState()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"'
        + 'class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');

}

function searchByCourtAuth() {


    document.getElementById('searchByCourtTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-court-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-court-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-court-tab-pane" aria-selected="false">'
        + 'بحث باسم المحكمة'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade " id="by-court-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-court-tab" tabindex="0">'
        + '<form id="searchByCourt" class="search-options">'
        + '<div class="row">'
        + '<div class="col-12">'
        + '<label for="court"><b> المحكمة</b></label>'
        + '<select id="court" name="court" class="searchInput">'
        + '<option disabled selected>اختر المحكمة</option>'
        + '</select>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByCourt()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"'
        + 'class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');
}

function searchByPlaintaiffNameAuth() {


    document.getElementById('searchByPlaintaiffNameTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-plaintiff_name-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-plaintiff_name-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-plaintiff_name-tab-pane" aria-selected="false">'
        + 'بحث باسم الموكل'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade " id="by-plaintiff_name-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-plaintiff_name-tab" tabindex="0">'
        + '<form id="searchByplaintiffName" class="search-options">'
        + '<div class="row">'
        + '<div class="col-12">'
        + '<label for="court_name"><b>اسم المدعي</b></label>'
        + '<input type="text" id="plaintiff_name" class="searchInput" name="plaintiff_name" required>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByplaintiffName()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"'
        + 'class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');
}

function searchByLawyerNameAuth() {
    document.getElementById('searchByLawyerNameTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-plaintiff_lawyer-tab"'
        + 'data-bs-toggle="tab" data-bs-target="#by-plaintiff_lawyer-tab-pane"'
        + 'type = "button" role = "tab" aria-controls="by-plaintiff_lawyer-tab-pane" aria-selected="false">'
        + 'بحث باسم المحامي'
        + '</button >'
        + '</li > ';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade " id="by-plaintiff_lawyer-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-plaintiff_lawyer-tab" tabindex="0">'
        + '<form id="searchByplaintiffLawyer" class="search-options">'
        + '<div class="row">'
        + '<div class="col-12">'
        + '<label for="plaintiff_lawyer"><b>اسم المحامي</b></label>'
        + '<select id="plaintiff_lawyer" class="searchInput" name="plaintiff_lawyer" required>'
        + '</select>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm"'
        + 'onclick="searchByplaintiff_lawyer()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"  class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="error" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');
}

function searchByYearsAuth() {
    document.getElementById('searchByYearsTabAuth').innerHTML = '<li class="nav-item" role="presentation">'
        + '<button class="nav-link tab searchBy" id="by-years-tab" data-bs-toggle="tab"'
        + 'data-bs-target="#by-years-tab-pane" type="button" role="tab"'
        + 'aria-controls="by-years-tab-pane" aria-selected="false">'
        + 'بحث بين عامين'
        + '</button>'
        + '</li>';

    document.getElementById('myTabContent').innerHTML += ('<div class="tab-pane fade " id="by-years-tab-pane" role="tabpanel"'
        + 'aria-labelledby="by-years-tab" tabindex="0">'
        + '<form id="searchByYears" class="search-options">'
        + '<div class="row">'
        + '<div class="col-6">'
        + '<label for="from_year"><b>من عام</b></label>'
        + '<select id="from_year" class="year searchInput" class="searchInput" name="from_year">'
        + '</select>'
        + '</div>'
        + '<div class="col-6">'
        + '<label for="to_year"><b>إلى عام</b></label>'
        + '<select id="to_year" class="year searchInput" name="to_year">'
        + '</select>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding: 0;">'
        + '<button type="submit" id="search-button"'
        + 'class="operations-btn btn btn-success btn-sm" onclick="searchByYears()" style="margin-left:2px">'
        + '<span data-feather="search" class="align-text-bottom"></span>'
        + 'ابحث'
        + '</button>'
        + '<button type="reset" id="remove-button"   class="operations-btn btn btn-danger btn-sm">'
        + '<span data-feather="x-circle" class="align-text-bottom"></span>'
        + 'امسح'
        + '</button>'
        + '<span id="errorSearchByYear" class="error">'
        + '</span>'
        + '</div>'
        + '<hr>'
        + '</form>'
        + '</div>');
}
function setAuth() {
    /***********all */
    allAuth();

    /******************by title */
    searchByTitleAuth();

    /******************by base number */
    searchByBaseNumberAuth();

    /******************by status */
    searchByStatusAuth();

    /******************by courts */
    searchByCourtAuth();


    /******************by plaintaiff name */
    if (role != 4)
        searchByPlaintaiffNameAuth();

    /******************by lawyer name */

    if (role != 4 && role != 3)
        searchByLawyerNameAuth();

    searchByYearsAuth();


}

function searchByTitle() {

    $('#searchByTitle').validate(
        {
            rules: {
                title: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: "الرجاء اختيار عنوان القضية"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                var title = $('#title').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: { 'title': title, "search_key": 4 },
                    type: 'get',
                    success: function (response) {
                        $('#table-body').empty();

                        console.log(response)

                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none ';
                    }
                });
            }
        }
    )
}

function searchByBaseNumber() {

    console.log(456)
    $('#searchByBaseNumber').validate(
        {

            rules: {
                base_number: {
                    required: true
                },
                year: {
                    required: true
                }
            },
            messages: {
                base_number: {
                    required: "الرجاء اختيار رقم الأساس"
                }, year: {
                    required: "الرجاء اختيار العام"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                console.log(6656)

                var number = $('#base_number').val();
                var year = $('#year').val();

                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'year': year,
                        'number': number,
                        "search_key": 3
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';

                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });
            }
        }
    )
}


function searchByYears() {

    $('#searchByYears').validate(
        {

            rules: {
                from_year: {
                    required: true
                },
                to_year: {
                    required: true
                }
            },
            messages: {
                from_year: {
                    required: "الرجاء اختيار \"من\" عام"
                }, to_year: {
                    required: "الرجاء اختيار \"إلى\" عام"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                console.log(6656)

                var from_year = $('#from_year').val();
                var to_year = $('#to_year').val();

                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'to_year': to_year,
                        'from_year': from_year,
                        "search_key": 2
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();
                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                    }
                });
            }
        }
    )
}

function searchByState() {
    $('#searchByState').validate(
        {
            rules: {
                state: {
                    required: true
                }
            },
            messages: {
                state: {
                    required: "الرجاء اختيار حالة القضية"
                }
            },
            submitHandler: function (form) {


                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                var value_status = $('#state').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'value_status': value_status,
                        "search_key": 1
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';

                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                    }
                });
            }
        }
    )
}
function searchByCourt() {

    $('#searchByCourt').validate(
        {
            rules: {
                court_name: {
                    required: true
                }
            },
            messages: {
                court_name: {
                    required: "الرجاء اختيار اسم المحكمة"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                var court_id = $('#court').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'court_id': court_id,
                        "search_key": 5
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';

                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });
            }
        }
    )
}


function searchByplaintiffName() {

    $('#searchByplaintiffName').validate(
        {
            rules: {
                plaintiff_name: {
                    required: true
                }
            },
            messages: {
                plaintiff_name: {
                    required: "الرجاء اختيار اسم المدعي"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                var plaintiff_name = $('#plaintiff_name').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'plaintiff_name': plaintiff_name,
                        "search_key": 7
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';

                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none'; console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });
            }
        }
    )
}


function searchByplaintiff_lawyer() {

    $('#searchByplaintiffLawyer').validate(
        {
            rules: {
                plaintiff_lawyer: {
                    required: true
                }
            },
            messages: {
                plaintiff_lawyer: {
                    required: "الرجاء اختيار اسم المحامي"
                }
            },
            submitHandler: function (form) {


                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex'; $('.error').html()
                var lawyerName = $('#plaintiff_lawyer').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/cases/filter',
                    data: {
                        'lawyerName': lawyerName,
                        "search_key": 6
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response.cases;
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف


                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none'; console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });
            }
        }
    )
}

(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);
            setAuth();
            fillYears();
        })
        .catch((error) => {
            console.log(error);
        });
})();

function fillYears() {
    // الحصول على عنصر select عن طريق الـ class
    var yearSelect = document.getElementsByClassName("year");

    // الحصول على التاريخ الحالي
    var currentYear = new Date().getFullYear();
    for (var j = 0; j < yearSelect.length; j++) {
        yearSelect[j].add(document.createElement("option"));
        for (i = 1980; i <= currentYear; i++) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            yearSelect[j].add(option);
        }
    }

}
