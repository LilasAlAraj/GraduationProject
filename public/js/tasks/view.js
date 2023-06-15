(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();


/********************* */

function add_task() {
    window.location.href = "http://127.0.0.1:8000/task/create";
}


function setAuth() {
    addNewTaskBtn = document.getElementById('addNewTaskBtn');
    if (role == 1 || role == 2) {


        addNewTaskBtn.innerHTML =
            '<button type="button" id="add-task-button" class="operations-btn btn" onclick="add_task()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة  مهمة جديدة'
            + '</button>'
    }

}

let data;

(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);
            setAuth();
            displayAll()
        })
        .catch((error) => {
            console.log(error);
        });
})();
function displayAll() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('spinner').style.display = 'flex';
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/tasks/all',
        type: 'get',
        success: function (response) {

            data = response;
            console.log(response);

            // تحديث Pagination
            updatePagination(data);
            showPage(1, data)
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';

        },
        error: function (response) {
            console.log(response);

        }
    });
}

function nextTasksSearch() {
    $('#searchByNextDates').validate(
        {
            submitHandler: function (form) {

                document.getElementById('content').style.display = 'none';
                document.getElementById('spinner').style.display = 'flex';

                $('#errorNextTask').html()

                var statusSearch = $('#statusSearch').val();
                var prioritySearch = $('#prioritySearch').val();
                if (prioritySearch === null && statusSearch === null) {
                    $('#errorNextTask').html('الرجاء اختيار مفاتيح البحث')
                    return;
                } else {

                    $.ajax({
                        url: 'http://127.0.0.1:8000/tasks/filter',
                        type: 'get',
                        data: {
                            'search_key': '1',
                            'status': statusSearch,
                            'priority': prioritySearch
                        },
                        success: function (response) {

                            data = response;
                            // تحديث Pagination
                            updatePagination(data);
                            showPage(1, data)

                            document.getElementById('content').style.display = 'block';
                            document.getElementById('spinner').style.display = 'none';
                        },
                        error: function (response) {
                            console.log(response);

                            document.getElementById('content').style.display = 'block';
                            document.getElementById('spinner').style.display = 'none';
                        }
                    });

                }

            }
        }
    )
}



function specificSearch() {
    $('#searchBySpecific').validate(
        {
            submitHandler: function (form) {


                $('#errorSpecificTasks').html()

                var statusSearch = $('#specificStatusSearch').val();
                var prioritySearch = $('#specificPrioritySearch').val();
                console.log(statusSearch + " " + prioritySearch)
                if (prioritySearch === null && statusSearch === null) {
                    $('#errorSpecificTasks').html('الرجاء اختيار مفاتيح البحث')
                    return;
                } else {
                    document.getElementById('content').style.display = 'none';
                    document.getElementById('spinner').style.display = 'flex';
                    $.ajax({
                        url: 'http://127.0.0.1:8000/tasks/filter',
                        type: 'get',
                        data: {
                            'search_key': '2',
                            'status': statusSearch,
                            'priority': prioritySearch
                        },
                        success: function (response) {

                            data = response;
                            // تحديث Pagination
                            updatePagination(data);
                            showPage(1, data)
                            document.getElementById('content').style.display = 'block';
                            document.getElementById('spinner').style.display = 'none';
                        },
                        error: function (response) {
                            console.log(response);
                            document.getElementById('content').style.display = 'block';
                            document.getElementById('spinner').style.display = 'none';
                        }
                    });
                }
            }
        }
    )
}

function nextTasks() {

    document.getElementById('content').style.display = 'none';
    document.getElementById('spinner').style.display = 'flex';
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/tasks/next',
        type: 'get',
        success: function (response) {

            data = response;
            console.log(response);

            // تحديث Pagination
            updatePagination(data);
            showPage(1, data)

            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
        },
        error: function (response) {
            console.log(response);
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';

        }
    });
}


// function search() {

//     $('#search-options').validate(
//         {

//             rules: {
//                 from_date: {
//                     required: true
//                 },
//                 to_date: {
//                     required: true
//                 }
//             },
//             messages: {
//                 from_date: {
//                     required: "الرجاء اختيار التاريخ"
//                 },
//                 to_date: {
//                     required: "الرجاء اختيار التاريخ"
//                 }
//             },
//             submitHandler: function (form) {

//                 $('.error').html()


//                 var from_date = $('#from_date').val();
//                 var to_date = $('#to_date').val();




//                 let from = new Date(from_date).getTime();
//                 let to = new Date(to_date).getTime();

//                 if (from > to) {
//                     $('.error').html('الرجاء اختيار التواريخ بشكل صحيح')

//                 } else {


//                     var searchResults = [];
//                     for (var i = 0; i < data.length; i++) {
//                         if (data[i].date >= from_date && data[i].date <= to_date) {
//                             searchResults.push(data[i]);
//                         }
//                     }

//                     updatePagination(searchResults);

//                     showPage(1, searchResults)

//                 }

//             }
//         }
//     )
// }

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
            updatePagination(data, currentPageGlobally);

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

            updatePagination(data, currentPageGlobally);



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
            updatePagination(data, currentPageGlobally);

        }
    }

    nextLiChild.innerHTML = '»'

    nextLi.appendChild(nextLiChild)
    $('#pagination').append(nextLi);

    if (currentPageGlobally === totalPages) {
        nextLi.classList.add('disabled');
    }

    // عرض الصفحة الحالية من الجدول
    showPage(currentPageGlobally, data);

    // عند النقر على أزرار الانتقال ثم اختيار الصفحة المناسبة وتلوينها
    const pi = $('#pagination .page-item');

    console.log(currentPageGlobally)
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
    $('#table-body').empty();
    for (var i = startIndex; i < endIndex; i++) {
        const task = data[i].task;
        const lawyers = data[i].lawyers;

        console.log(task)

        var lawyersString = '';
        for (var j = 0; j < lawyers.length; j++) {


            lawyersString += lawyers[j].first_name + ' ' + lawyers[j].last_name;
            if (j < lawyers.length - 1)
                lawyersString += '<hr>';
        }

        description = task.description;
        if (description.length > 100)
            description = description.substring(0, 100) + '... إلخ';



        const status = document.createElement('span');
        status.id = 'status-' + task.id;
        status.classList.add('badge', 'state');

        if (task.Value_Status === 1) {
            status.classList.add('text-bg-info');
            status.innerHTML = 'قيد التنفيذ'
        } else if (task.Value_Status === 2) {
            status.innerHTML = 'ملغاة'
            status.classList.add('text-bg-danger');
        } else if (task.Value_Status === 3) {
            status.innerHTML = 'مكتملة'
            status.classList.add('text-bg-success');
        } else if (task.Value_Status === 4) {
            status.innerHTML = 'مؤجلة'
            status.classList.add('text-bg-dark');
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


        const view_btn = document.createElement('button')
        view_btn.type = "button"
        view_btn.id = "view-button"
        view_btn.classList.add('menu-operations-btn', 'btn', 'btn-primary')
        view_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            + ' عرض المهمة'
        view_btn.setAttribute("data-bs-toggle", "modal")
        view_btn.setAttribute("data-bs-target", "#viewTaskBackdrop")
        view_btn.onclick = function () {
            viewTask(task, lawyers)
        }

        const viewOpLi = document.createElement('li');
        viewOpLi.append(view_btn);
        viewOpLi.classList = 'operationMenuItem'
        operationMenu.append(viewOpLi)




        if (role == 1 || role == 2) {

            const edit_btn = document.createElement('button')
            edit_btn.type = "button"
            edit_btn.id = "edit-button"
            edit_btn.classList.add('menu-operations-btn', 'btn', 'btn-secondary')
            edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 align-text-bottom" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'
                + ' تعديل المهمة'
            edit_btn.setAttribute("data-bs-toggle", "modal")
            edit_btn.setAttribute("data-bs-target", "#editRecommendationModal")
            edit_btn.onclick = function () {
                window.location.href = 'http://127.0.0.1:8000/tasks/' + task.id + '/edit'
            }

            const editOpLi = document.createElement('li');
            editOpLi.append(edit_btn);
            editOpLi.classList = 'operationMenuItem'
            operationMenu.append(editOpLi)
        }
        if (role == 1 || role == 2) {
            const remove_btn = document.createElement('button')
            remove_btn.type = "button"
            remove_btn.id = "remove-button"
            remove_btn.classList.add('menu-operations-btn', 'btn', 'btn-danger')
            remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' إزالة المهمة'
            remove_btn.onclick = function () {
                confirmDeleteTask(task.id);
            }
            const removeOpLi = document.createElement('li');
            removeOpLi.append(remove_btn);
            removeOpLi.classList = 'operationMenuItem'


            operationMenu.append(removeOpLi)
        }

        if (role == 1 || role == 2) {
            const change_status_btn = document.createElement('button')
            change_status_btn.type = "button"
            change_status_btn.id = "change-status-button"
            change_status_btn.classList.add('menu-operations-btn', 'btn', 'btn-warning')
            change_status_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-text-bottom" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'
                + ' تغيير حالة المهمة'

            change_status_btn.setAttribute("data-bs-toggle", "modal")
            change_status_btn.setAttribute("data-bs-target", "#staticBackdrop")

            const changeStatusOpLi = document.createElement('li');
            changeStatusOpLi.append(change_status_btn);
            changeStatusOpLi.classList = 'operationMenuItem'

            document.getElementById('change-button').onclick = function () {
                changeStatus(task.id)
            }
            operationMenu.append(changeStatusOpLi)
        }

        operations.append(opBtn, operationMenu);

        var row = $('<tr>').append(
            $('<td>').text(task.name),
            $('<td>').text(task.priority),
            $('<td>').text(task.start_date),
            $('<td>').text(task.end_date),
            $('<td>').append(lawyersString),
            $('<td>').text(description),
            $('<td>').append(status),
            $('<td>').append(operations),

        );
        row.attr('id', 'task-row' + task.id);
        $('#table-body').append(row);




    }


    // تمييز الصفحة الحالية في Pagination
}

function changeStatus(id) {
    $('#chang_status_form').validate(
        {
            rules: {
                selected_status: {
                    required: true
                }
            },
            messages: {
                selected_status: {
                    required: "الرجاء اختيار الحالة الجديدة للمهمة"
                }
            },
            submitHandler: function (form) {

                statusID = document.getElementById("selected_status").value;

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/tasks/" + id + "/status/edit", // اسم ملف php الذي يقوم بالحذف
                    method: "put", // طريقة الإرسال POST
                    data: { 'Value_Status': statusID },
                    success: function (response) {
                        console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح

                        const status = document.getElementById("status-" + id);
                        status.classList = [];

                        if (statusID == 1) {

                            status.classList.add('text-bg-info', 'badge', 'state');
                            status.innerHTML = ('قيد التنفيذ')
                        } else if (statusID == 2) {
                            status.classList.add('text-bg-danger', 'badge', 'state');
                            status.innerHTML = ('ملغاة')
                        } else if (statusID == 3) {
                            status.classList.add('text-bg-success', 'badge', 'state');
                            status.innerHTML = ('مكتملة')
                        } else if (statusID == 4) {
                            status.classList.add('text-bg-dark', 'badge', 'state');
                            status.innerHTML = ('مؤجلة')
                        }
                        closeModal();
                        $('#staticBackdrop').modal('hide');
                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                    },
                    error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                        console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });

            }
        }
    )

}
function confirmDeleteTask(id) {
    $('#deleteTaskBackdrop').modal('show');
    $('#deleteTaskBackdrop').css('background', 'rgba(0,0,0,.3)');

    document.getElementById('deleteTaskButton').onclick = function () {
        deleteRecommendation(id)
    }
}
function deleteRecommendation(id) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/task/" + id,
        method: "delete",
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                document.getElementById('task-row' + id).remove();
            }
            $('#deleteTaskBackdrop').modal('hide');
            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            document.getElementById('closeModal').onclick = function () {
                window.location.href = 'http://127.0.0.1:8000/tasks';
            }
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
        }
    });
}

function viewTask(task, lawyers) {


    var lawyersString = '';
    for (var j = 0; j < lawyers.length; j++) {
        console.log(lawyers[j])

        lawyersString += lawyers[j].first_name + ' ' + lawyers[j].last_name;
        if (j < lawyers.length - 1)
            lawyersString += '، ';
    }
    const status = document.createElement('span');
    status.classList.add('badge', 'state');

    if (task.Value_Status === 1) {
        status.classList.add('text-bg-info');
        status.innerHTML = 'قيد التنفيذ'
    } else if (task.Value_Status === 2) {
        status.innerHTML = 'ملغاة'
        status.classList.add('text-bg-danger');
    } else if (task.Value_Status === 3) {
        status.innerHTML = 'مكتملة'
        status.classList.add('text-bg-success');
    } else if (task.Value_Status === 4) {
        status.innerHTML = 'مؤجلة'
        status.classList.add('text-bg-dark');
    }
    document.getElementById('TaskName').innerHTML = (task.name);
    document.getElementById('TaskPriority').innerHTML = (task.priority);
    document.getElementById('TaskStartDate').innerHTML = (task.start_date);
    document.getElementById('TaskEndDate').innerHTML = (task.end_date);
    document.getElementById('TaskLawyers').innerHTML = (lawyersString);
    document.getElementById('TaskDescription').innerHTML = (task.description);
    document.getElementById('TaskStatus').append(status);

}
function deleteCase(itemId) {
    var confirmation = confirm("هل أنت متأكد من حذف هذا العنصر؟");
    if (confirmation) {
        // احذف الصف من الجدول هنا، ويمكن استخدام المعرف المحدد لهذا الصف
    }
}





function closeModal() {
    $('.error').html('');

    // حذف المعلومات المخزنة في ذاكرة التخزين المؤقت للجلسة
    sessionStorage.clear();
}
