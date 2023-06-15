(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })


})();

function getLawyers() {
    $.ajax({
        url: "http://127.0.0.1:8000/lawyers",
        type: "Get",
        success: function (response) {
            const LawyerList = document.getElementById('plaintiff_lawyer');
            LawyerList.innerHTML = '<option disabled selected>اختر اسم الوكيل</option>'
            for (var i = 0; i < response.lawyers.length; i++) {
                option = document.createElement('option');
                option.value = response.lawyers[i].id;
                option.innerHTML = response.lawyers[i].first_name + ' ' + response.lawyers[i].last_name;

                LawyerList.append(option)
            }


        },

        error: function (response) {
            // If the login is unsuccessful, display the error message
            // $('#error').html(response.responseJSON.errors.phone[0]);
            $('#error').html(response.responseJSON);
        }
    });

}
function getCourts() {
    $.ajax({
        url: "http://127.0.0.1:8000/court/all",
        type: "Get",
        success: function (response) {
            courts = document.getElementById('court');
            for (var i = 0; i < response.length; i++) {
                option = document.createElement('option');
                option.value = response[i].id;
                option.innerHTML = response[i].name + '/' + response[i].place;
                courts.append(option)
            }
        },

        error: function (response) {
            // If the login is unsuccessful, display the error message
            // $('#error').html(response.responseJSON.errors.phone[0]);
            $('#error').html(response.responseJSON);
        }
    });

}
/********************* */


function setAuth() {
    addNewCaseBtnDiv = document.getElementById('addNewCaseButton');
    if (role == 1 || role == 2) {
        addNewCaseBtnDiv.innerHTML =
            '<button type="button" id="add-cases-button" class="operations-btn btn"'
            + 'onclick="add_cases()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة قضية جديدة'

            + '</button>'
    }




}

function add_cases() {
    window.location.href = "http://127.0.0.1:8000/cases/create";
}

let currentData;

(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);

            getCourts();
            getLawyers();


            setAuth();
            displayAll();



        })
        .catch((error) => {
            console.log(error);
        });
})();
function displayAll() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('spinner').style.display = 'flex';
    $.ajax({
        url: 'http://127.0.0.1:8000/cases/all',
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
        }
    });

}


var currentPageGlobally = 1;



// تحديث Pagination بعد تحديد الفترة الزمنية
function updatePagination(data) {

    // إزالة Pagination الحالي
    $('#pagination').empty();

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
        } else if (currentPageGlobally + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPageGlobally - Math.floor(maxPagesToShow / 2);
            endPage = currentPageGlobally + Math.floor(maxPagesToShow / 2);
        }
    }


    // إضافة زر السابق


    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');



    const prevLiChild = document.createElement('a');
    prevLiChild.classList.add('page-link');



    prevLiChild.onclick = function () {
        if (currentPageGlobally > 1) {
            currentPageGlobally--;
            updatePagination(currentData, currentPageGlobally);

        }
    }

    prevLiChild.innerHTML = '«'

    prevLi.appendChild(prevLiChild)
    if (currentPageGlobally === 1) {
        prevLi.classList.add('disabled');
    }

    $('#pagination').append(prevLi);
    for (var i = startPage; i <= endPage; i++) {
        const currentPage = i; // تخزين القيمة الحالية لـ i


        const li = document.createElement('li');
        li.classList.add('page-item');


        const liChild = document.createElement('a');
        liChild.classList.add('page-link');
        li.setAttribute('page', currentPage);


        liChild.onclick = function () {
            currentPageGlobally = li.getAttribute('page');

            updatePagination(currentData, currentPageGlobally);



        }

        liChild.innerHTML = currentPage

        li.appendChild(liChild)


        $('#pagination').append(li);

        if (i === currentPageGlobally) {
            li.classList.add('active');
        }


    }




    // إضافة زر next


    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');



    const nextLiChild = document.createElement('a');
    nextLiChild.classList.add('page-link');



    nextLiChild.onclick = function () {
        if (currentPageGlobally < totalPages) {
            currentPageGlobally++;
            updatePagination(currentData, currentPageGlobally);

        }
    }

    nextLiChild.innerHTML = '»'

    nextLi.appendChild(nextLiChild)
    $('#pagination').append(nextLi);

    if (currentPageGlobally === totalPages) {
        nextLi.classList.add('disabled');
    }

    // عرض الصفحة الحالية من الجدول
    showPage(currentPageGlobally, currentData);

    // عند النقر على أزرار الانتقال ثم اختيار الصفحة المناسبة وتلوينها
    const pi = $('#pagination .page-item');

    for (var i = 0; i < pi.length; i++) {
        if (currentPageGlobally === pi[i].getAttribute('page'))
            pi[i].classList.add('active')
    }
}


// عرض الصفحة المحددة من الجدول
function showPage(pageNumber, data) {
    // حساب الصفوف التي يجب عرضها
    var itemsPerPage = 10;
    var startIndex = (pageNumber - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, data.length);

    // عرض الصفوف
    var table = document.getElementById("cases-table");
    if (table.rows.length === 2)
        table.rows[1].remove();
    body = $('#table-body');
    body.text('');
    for (var i = startIndex; i < endIndex; i++) {
        const case_ = data[i].case;

        courtName = data[i].court.name + ' في ' + data[i].court.place
        room = case_.case_room;


        var case_numbers = '';
        for (var j = 0; j < data[i].case_numbers.length; j++) {
            case_numbers += data[i].case_numbers[j].date + '/' + data[i].case_numbers[j].number;
            if (j !== data[i].case_numbers.length - 1)
                case_numbers += "<hr>";
        }


        var plaintiff_names = '';
        for (var j = 0; j < data[i].plaintiff_names.length; j++) {
            plaintiff_names += data[i].plaintiff_names[j].first_name + ' ' + data[i].plaintiff_names[j].father_name + ' ' + data[i].plaintiff_names[j].last_name;
            if (j !== data[i].plaintiff_names.length - 1)
                plaintiff_names += "<hr>";
        }



        var plaintiff_lawyers = '';
        for (var j = 0; j < data[i].plaintiff_lawyers.length; j++) {
            plaintiff_lawyers += data[i].plaintiff_lawyers[j].first_name + ' ' + data[i].plaintiff_lawyers[j].father_name + ' ' + data[i].plaintiff_lawyers[j].last_name;
            if (j !== data[i].plaintiff_lawyers.length - 1)
                plaintiff_lawyers += "<hr>";
        }
        var defendant_names = '';
        for (var j = 0; j < data[i].defendant_names.length; j++) {
            defendant_names += data[i].defendant_names[j].name;
            if (j !== data[i].defendant_names.length - 1)
                defendant_names += "<hr>";
        }


        var defendant_lawyers = '';
        for (var j = 0; j < data[i].defendant_lawyers.length; j++) {
            defendant_lawyers += data[i].defendant_lawyers[j].name;

            if (j !== data[i].defendant_lawyers.length - 1)
                defendant_lawyers += "<hr>";
        }



        const operations = document.createElement('div');
        operations.classList.add('dropdown');
        const opBtn = document.createElement('button');

        opBtn.classList.add('dropdown-toggle', 'btn', 'btn-secondary')
        opBtn.type = 'button';
        opBtn.setAttribute("data-bs-toggle", "dropdown")
        opBtn.setAttribute("aria-expanded", "false");
        const operationMenu = document.createElement('ul');
        operationMenu.id = 'operationMenu';
        operationMenu.classList.add('dropdown-menu');




        const viewBtn = document.createElement('button')
        viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            + ' عرض القضية كاملة'
        viewBtn.setAttribute('title', 'عرض القضية');
        viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
        viewBtn.onclick = function () {
            viewCase(case_.id)
        }
        const viewOpLi = document.createElement('li');
        viewOpLi.append(viewBtn);
        viewOpLi.classList = 'operationMenuItem'


        const archiveBtn = document.createElement('button');
        archiveBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
            + ' نقل القضية إلى الأرشيف'
        archiveBtn.setAttribute('title', 'نقل القضية إلى الأرشيف');
        archiveBtn.classList.add('btn', 'btn-warning', 'menu-operations-btn');
        archiveBtn.setAttribute("data-bs-target", "#archiveCaseBackdrop");
        archiveBtn.setAttribute("data-bs-toggle", "modal")
        archiveBtn.onclick = function () {
            document.getElementById('archiveBtnBackdrop').onclick = function () {
                ArhiveCase(case_.id)
            }
        }
        const archOpLi = document.createElement('li');
        archOpLi.append(archiveBtn);
        archOpLi.classList = 'operationMenuItem'

        const edit_btn = document.createElement('button');
        edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 align-text-bottom" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'
            + ' تعديل معلومات القضية'
        edit_btn.setAttribute('title', 'تغيير حالة القضية');
        edit_btn.classList.add('btn', 'btn-secondary', 'menu-operations-btn');
        edit_btn.onclick = function () {
            document.getElementById('editBtnBackdrop').onclick = function () {
                editCase(case_.id)
            }
        }

        edit_btn.setAttribute("data-bs-toggle", "modal")
        edit_btn.setAttribute("data-bs-target", "#editCaseBackdrop")

        const edit_btnOpLi = document.createElement('li');
        edit_btnOpLi.append(edit_btn);
        edit_btnOpLi.classList = 'operationMenuItem'

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
            + 'مسح القضية'
        deleteBtn.setAttribute('title', 'مسح القضية');
        deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
        deleteBtn.setAttribute("data-bs-target", "#deleteCaseBackdrop");
        deleteBtn.setAttribute("data-bs-toggle", "modal")
        deleteBtnBackdrop.onclick = function () {
            deleteCase(case_.id)
        }
        const delOpLi = document.createElement('li');
        delOpLi.append(deleteBtn)
        delOpLi.classList = 'operationMenuItem'

        if (role == 1 || role == 2)
            operationMenu.append(viewOpLi, archOpLi, edit_btnOpLi, delOpLi);
        else
            operationMenu.append(viewOpLi);


        operations.append(opBtn, operationMenu);

        const status = document.createElement('span');
        status.classList.add('badge', 'state');

        if (case_.Value_Status === 1) {
            //winner
            status.classList.add('text-bg-success');
            status.innerHTML = 'رابحة'
        } else if (case_.Value_Status === 2) {
            //losser
            status.innerHTML = 'خاسرة'
            status.classList.add('text-bg-danger');
        } else if (case_.Value_Status === 3) {
            //running
            status.innerHTML = 'جار العمل عليها'
            status.classList.add('text-bg-info');
        } else if (case_.Value_Status === 4) {
            //blocked
            status.innerHTML = 'معلقة'
            status.classList.add('text-bg-dark');
        }

        const row = $('<tr>').append(
            $('<td>').append((case_numbers)),
            $('<td>').text(case_.title),
            $('<td>').text(courtName + "/" + room),
            $('<td>').append((plaintiff_names)),
            $('<td>').append((plaintiff_lawyers)),
            $('<td>').append((defendant_names)),
            $('<td>').append((defendant_lawyers)),
            $('<td>').append(status),
            $('<td>').append(operations)

        );

        row.attr('id', case_.id);
        body.append(row);

    }

    if (table.rows.length == 1) {

        var headerRow = table.rows[0];
        var numColumns = headerRow.cells.length;
        var row = table.insertRow(1);
        var cell = row.insertCell(0);
        cell.colSpan = numColumns;
        cell.innerHTML = "لا يوجد بيانات";

    }

}


function viewCase(caseId) {
    window.location.href = "http://127.0.0.1:8000/cases/view/" + caseId;

}

function deleteCase(caseId) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/" + caseId, // اسم ملف php الذي يقوم بالحذف
        method: "Delete", // طريقة الإرسال POST
        data: { id_Archive: 1, case_id: caseId },
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            $('#deleteCaseBackdrop').modal('hide');

            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            document.getElementById('closeModal').onclick = function () {
                window.location.href = 'http://127.0.0.1:8000/cases';
            }

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });


}
function ArhiveCase(caseId) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/" + caseId, // اسم ملف php الذي يقوم بالحذف
        method: "Delete", // طريقة الإرسال POST
        data: { id_Archive: 2, case_id: caseId },
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            $('#archiveCaseBackdrop').modal('hide');

            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            document.getElementById('closeModal').onclick = function () {
                window.location.href = 'http://127.0.0.1:8000/cases';
            }

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });


}
function editCase(caseId) {
    window.location.href = 'http://127.0.0.1:8000/cases/' + caseId + '/edit'

}



function reverseData() {

    let tempCurrentData = [];

    const n = currentData.length - 1;
    for (var i = n; i >= 0; i--)
        tempCurrentData[n - i] = currentData[i];

    currentData = tempCurrentData;

    currentPageGlobally = 1;
    updatePagination(currentData);
    showPage(currentPageGlobally, currentData);

    btn = document.getElementById('reverse-btn');
    if (btn.getAttribute('data-display') === 'asc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تصاعدي'
        btn.setAttribute('data-display', 'desc')
    } else if (btn.getAttribute('data-display') === 'desc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تنازلي'
        btn.setAttribute('data-display', 'asc')
    }
}



