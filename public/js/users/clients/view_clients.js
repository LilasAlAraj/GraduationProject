
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })



})();

/********************* */


function setAuth() {
    addNewClientButton = document.getElementById('addNewClientButton');
    if (role == 1 || role == 2) {

        addNewClientButton.innerHTML =
            '<button type="button" id="add-clients-button" class="operations-btn btn"'
            + 'onclick="add_client()" style="">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة عميل جديد'

            + '</button>'
    }
}

function add_client() {
    window.location.href = "http://127.0.0.1:8000/users/clients/create";
}

let data;
var currentData;

(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);
            setAuth();
            displayAll();

            // جلب البيانات من ملف JSON

        })
        .catch((error) => {
            console.log(error);
        });
})();


function displayAll() {

    document.getElementById('content').style.display = 'none';
    document.getElementById('spinner').style.display = 'flex';
    $.ajax({
        url: 'http://127.0.0.1:8000/users/getclients',
        dataType: 'json',
        success: function (response) {
            console.log(response)

            currentData = data = response.clients;
            // تحديث Pagination

            updatePagination(currentData);
            showPage(1, currentData)
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';


        },
        error: function (response) {
            console.log(response)
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
        }
    });
}

function searchByName() {
    $('#searchByName').validate(
        {
            rules: {
                name: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "الرجاء إدخال الاسم"
                }
            },
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';
                $('.error').html()
                var name = $('#name').val();
                $.ajax({
                    url: 'http://127.0.0.1:8000/users/filter',
                    data: {
                        'name': name,
                        "search_key": 1
                    },
                    type: 'get',
                    success: function (response) {

                        $('#table-body').empty();

                        console.log(response)
                        currentData = response;

                        document.getElementById('content').style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                        // تحديث Pagination
                        updatePagination(currentData);
                        showPage(1, currentData)

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

var currentPageGlobally = 1;



// تحديث Pagination بعد تحديد الفترة الزمنية
function updatePagination(dataS) {

    // إزالة Pagination الحالي
    $('#pagination').empty();

    // إنشاء Pagination جيد
    var itemsPerPage = 10
    console.log(dataS);
    var totalPages = Math.ceil(dataS.length / itemsPerPage);



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

function addClientRow(table, client) {


    const client_name = client.first_name + " " + client.last_name;
    const client_father_name = client.father_name;
    const client_mother_name = client.mother_name;
    const client_date_of_birth = client.date_of_birth;
    const client_place_of_birth = client.place_of_birth;
    const client_phone_number = client.phone;
    const client_current_address = client.current_address;
    const client_email = client.email;
    const client_id = client.id;
    const client_status = client.status;
    const status = document.createElement('span');
    status.classList.add('badge', 'state');
    status.id = 'status-' + client_id;

    if (client_status === "مفعل") {
        //winner
        status.classList.add('text-bg-success');
        status.innerHTML = 'مفعل'
    } else if (client_status === "غير مفعل") {
        //losser
        status.innerHTML = 'غير مفعل'
        status.classList.add('text-bg-danger');
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
        + ' عرض المعلومات كاملة'
    viewBtn.setAttribute('title', 'عرض المعلومات');
    viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
    viewBtn.onclick = function () {
        viewClient(client_id)
    }
    const viewOpLi = document.createElement('li');
    viewOpLi.append(viewBtn);
    viewOpLi.classList = 'operationMenuItem'
    operationMenu.append(viewOpLi);



    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
        + ' تعديل معلومات العميل'
    editBtn.setAttribute('title', 'تعديل معلومات العميل');
    editBtn.classList.add('btn', 'btn-warning', 'menu-operations-btn');

    editBtn.onclick = function () {
        editClient(client_id)
    }
    const editOpLi = document.createElement('li');
    editOpLi.append(editBtn)
    editOpLi.classList = 'operationMenuItem'

    if (role == 1 || role == 2)
        operationMenu.append(editOpLi);




    const editStatusBtn = document.createElement('button');
    editStatusBtn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'
        + ' تغيير حالة الحساب'
    editStatusBtn.setAttribute('title', 'تغيير حالة الحساب');
    editStatusBtn.classList.add('btn', 'btn-secondary', 'menu-operations-btn');

    editStatusBtn.onclick = function () {
        editStatus(client_id)
    }
    const editStatusOpLi = document.createElement('li');
    editStatusOpLi.append(editStatusBtn)
    editStatusOpLi.classList = 'operationMenuItem'

    if (role == 1 || role == 2)
        operationMenu.append(editStatusOpLi);
    operations.append(opBtn, operationMenu);



    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
        + ' حذف الحساب'
    deleteBtn.setAttribute('title', 'حذف الحساب');
    deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
    deleteBtn.setAttribute("data-bs-target", "#deleteClientBackdrop");
    deleteBtn.setAttribute("data-bs-toggle", "modal")
    deleteBtn.onclick = function () {
        document.getElementById('deleteClientPopup').onclick = function () {
            deleteClient(client_id)
        }
    }
    const deleteOpLi = document.createElement('li');
    deleteOpLi.append(deleteBtn)
    deleteOpLi.classList = 'operationMenuItem'

    if (role == 1)
        operationMenu.append(deleteOpLi);

    operations.append(opBtn, operationMenu);





    const row = $('<tr>').append(

        $('<td>').append(client_name),
        $('<td>').append(client_father_name),
        $('<td>').append(client_mother_name),
        $('<td>').append(client_phone_number),
        $('<td>').append(status),

        $('<td>').append(operations)
    );
    row.attr('id', client_id);
    table.append(row);
}

// عرض الصفحة المحددة من الجدول
function showPage(pageNumber, data) {
    // حساب الصفوف التي يجب عرضها
    var itemsPerPage = 10;
    var startIndex = (pageNumber - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, data.length);


    // عرض الصفوف
    table = $('#table-body');
    table.empty();
    for (var i = startIndex; i < endIndex; i++) {
        const client = data[i];
        addClientRow(table, client)
    }



}


function viewClient(clientId) {
    window.location.href = "http://127.0.0.1:8000/users/clients/" + clientId;


}


function deleteClient(clientId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:8000/users/' + clientId,
        type: 'delete',
        success: function (response) {
            console.log(response)

            // وقت الحذف لازم يطلع بوب أب برسالة الاستجابة
            $('#deleteClientBackdrop').modal('hide');

            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            $('tr#'+clientId).remove();
        },
        error: function (response) {
            console.log(response)
        }
    });

}


function editStatus(clientId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:8000/users/update_status',
        type: 'post',
        data: { 'id': clientId },
        success: function (response) {
            console.log(response)

            if (response.status === 'success') {
                const status = document.getElementById('status-' + clientId);
                if (status.classList.contains('text-bg-success')) {
                    status.innerHTML = 'غير مفعل'
                    status.classList = '';
                    status.classList.add('badge', 'state', 'text-bg-danger');
                } else {
                    status.innerHTML = 'مفعل'
                    status.classList = '';
                    status.classList.add('badge', 'state', 'text-bg-success');
                }
            }


        },
        error: function (response) {
            console.log(response)
        }
    });

}

function editClient(clientId) {
    window.location.href = 'http://127.0.0.1:8000/users/client/' + clientId + '/edit/'

}
function reverseData() {

    let tempCurrentData = [];

    const n = currentData.length - 1;
    for (var i = n; i >= 0; i--)
        tempCurrentData[n - i] = currentData[i];

    currentData = tempCurrentData;

    currentPageGlobally = 1;
    updatePagination(currentData);
    // showPage(currentPageGlobally, currentData);
    btn = document.getElementById('reverse-btn');
    if (btn.getAttribute('data-display') === 'asc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تصاعدي'
        btn.setAttribute('data-display', 'desc')
    } else if (btn.getAttribute('data-display') === 'desc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تنازلي'
        btn.setAttribute('data-display', 'asc')
    }
}




function closeModal() {
    // حذف المعلومات المخزنة في ذاكرة التخزين المؤقت للجلسة
    sessionStorage.clear();
    console.log('// إغلاق النافذة المنبثقة')

}
