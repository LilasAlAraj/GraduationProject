(() => {
    'use strict'
    feather.replace({ 'aria-hidden': 'true' })
})();
/**************************** */

function setAuth() {
    addNewRecommendationBtn = document.getElementById('addNewRecommendationBtn');
    if (role == 1 || role == 2) {


        addNewRecommendationBtn.innerHTML =
            '<button type="button" id="add-recommendations-button" class="operations-btn btn" data-bs-toggle="modal" data-bs-target="#addRecommendationModal">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة  توصية جديدة'
            + '</button>'
    }
}


function add_Recommendation() {
    $('#addRecommendationError').css('color', 'red');
    $('#addRecommendationError').html('');

    $('#addRecommendation_form').validate({
        rules: {

            title: {
                required: true

            }, content: {
                required: true
            }
        },
        messages: {

            title: {
                required: "الرجاء إدخال عنوان التوصية",
            }, content: {
                required: "الرجاء إدخال محتوى التوصية",

            }
        },
        submitHandler: function (form) {
            $('.addRecommendationError').html("")


            var title = $('#title').val();
            var content = $('#content-rec').val();


            console.log(title);
            console.log(content);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            // console.log($('meta[name="csrf-token"]').attr('content'));
            $.ajax({
                url: "http://127.0.0.1:8000/recommendation",
                type: "POST",
                data: {
                    "title": title,
                    "content": content
                }
                , dataType: 'json',
                success: function (response) {
                    console.log(response)
                    if (response.status === 'success') {
                        const Recommendation = [];
                        Recommendation["title"] = title
                        Recommendation["content"] = content
                        Recommendation['id'] = response.id;
                        // عرض الصفوف


                        table = $('#table-body');

                        addRecommendationRow(table, Recommendation)

                        $('#addRecommendationModal').modal('hide');

                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                        closeModal();

                    } else {
                        $('#addRecommendationError').html(response.message);

                    }
                },

                error: function (response) {
                    console.log(response)
                    // If the login is unsuccessful, display the error message
                    // $('#error').html(response.responseJSON.errors.phone[0]);
                    $('#addRecommendationError').html(response.responseJSON);
                }
            });
        }
    })
}



let data;

(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);
            setAuth();

            // جلب البيانات من ملف JSON
            $.ajax({
                url: 'http://127.0.0.1:8000/recommendations/all',
                type: 'get',
                success: function (response) {

                    console.log(response)
                    data = response.recommendations;
                    // تحديث Pagination
                    displayAll();

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';

                },
                error: function (response) {
                    console.log(response);

                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
})();



function displayAll() {

    // عرض الصفوف
    table = $('#table-body');
    table.empty();
    for (var i = 0; i < data.length; i++) {
        const Recommendation = data[i];
        addRecommendationRow(table, Recommendation)
    }



    var table = document.getElementsByClassName("table")[0];
    if (table.rows.length == 1) {

        var headerRow = table.rows[0];
        var numColumns = headerRow.cells.length;
        var row = table.insertRow(1);
        var cell = row.insertCell(0);
        cell.colSpan = numColumns;
        cell.innerHTML = "لا يوجد بيانات";
        cell.id = 'NoData'

    }
}


function addRecommendationRow(table, Recommendation) {





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
        + ' عرض التوصية'
    view_btn.setAttribute("data-bs-toggle", "modal")
    view_btn.setAttribute("data-bs-target", "#viewRecommendationBackdrop")
    view_btn.onclick = function () {
        viewRecommendation(Recommendation.title, Recommendation.content)
    }

    const viewOpLi = document.createElement('li');
    viewOpLi.append(view_btn);
    viewOpLi.classList = 'operationMenuItem'
    operationMenu.append(viewOpLi)





    const edit_btn = document.createElement('button')
    edit_btn.type = "button"
    edit_btn.id = "edit-button"
    edit_btn.classList.add('menu-operations-btn', 'btn', 'btn-warning')
    edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 align-text-bottom" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'
        + ' تعديل التوصية'
    edit_btn.setAttribute("data-bs-toggle", "modal")
    edit_btn.setAttribute("data-bs-target", "#editRecommendationModal")
    edit_btn.onclick = function () {
        editRecommendation(Recommendation.id, Recommendation.title, Recommendation.content)
    }

    const editOpLi = document.createElement('li');
    editOpLi.append(edit_btn);
    editOpLi.classList = 'operationMenuItem'
    operationMenu.append(editOpLi)


    const remove_btn = document.createElement('button')
    remove_btn.type = "button"
    remove_btn.id = "remove-button"
    remove_btn.classList.add('menu-operations-btn', 'btn', 'btn-danger')
    remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
        + ' إزالة التوصية'
    remove_btn.onclick = function () {
        confirmDeleteRecommendation(Recommendation.id);
    }
    const removeOpLi = document.createElement('li');
    removeOpLi.append(remove_btn);
    removeOpLi.classList = 'operationMenuItem'
    operationMenu.append(removeOpLi)

    operations.append(opBtn, operationMenu);




    content = Recommendation.content;
    if (content.length > 50)
        content = content.substring(0, 150) + '.. إلخ'
    const row = $('<tr>').append(

        $('<td>').append(Recommendation.title),
        $('<td>').append(content),
        $('<td>').append(operations),

    );

    row.attr('id', 'Recommendation-row' + Recommendation.id);
    table.append(row);

}


function viewRecommendation(title, content) {
    document.getElementById('recommendationTitle').innerHTML = (title);
    document.getElementById('recommendationContent').innerHTML = (content);

}

function confirmDeleteRecommendation(id) {
    $('#deleteRecommendationBackdrop').modal('show');
    $('#deleteRecommendationBackdrop').css('background', 'rgba(0,0,0,.3)');
    $('#deleteRecommendationBackdrop').data('Recommendation-id', id);

    document.getElementById('deleteRecommendationButton').onclick = function () {
        deleteRecommendation()
    }
}


function deleteRecommendation() {
    id = $('#deleteRecommendationBackdrop').data('Recommendation-id');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/recommendation",
        method: "delete",
        data: { id: id },
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                document.getElementById('Recommendation-row' + id).remove();
            }
            $('#deleteRecommendationBackdrop').modal('hide');
            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
        }
    });
}

function editRecommendation(id, title, content) {
    document.getElementById('editTitle').value = title;
    document.getElementById('editContent').value = content;



    $('#editRecommendation_form').validate({
        rules: {
            editeTitle: {
                required: true

            }, editTitle: {
                required: true

            }
        },
        messages: {
            editeTitle: {
                required: "الرجاء إدخال عنوان التوصية",

            },
            editTitle: {
                required: "الرجاء إدخال محتوى التوصية",

            }
        },
        submitHandler: function (form) {
            var editTitle = $('#editTitle').val();
            var editContent = document.getElementById("editContent").value;



            $('#errorEditDecision').html('');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: "http://127.0.0.1:8000/recommendation",
                type: "Put",
                data: {
                    "title": editTitle,
                    "content": editContent,
                    "id": id
                },
                success: function (response) {
                    console.log(response);

                    if (response.status == 'success') {

                        Rec_row = document.getElementById('Recommendation-row' + id);
                        recTitle = document.getElementById('editTitle');
                        recContent = document.getElementById('editContent');
                        cells = Rec_row.getElementsByTagName('td');
                        cells[0].innerHTML = editTitle
                        recTitle.innerHTML = editTitle;


                        recContent.innerHTML = editContent;


                        if (editContent.length > 50)
                            editContent = editContent.substring(0, 150) + '.. إلخ'
                        cells[1].innerHTML = editContent
                        $('#editRecommendationModal').modal('hide');


                    }
                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                },
                error: function (response) {
                    console.log(response);
                    $('#editRecommendationError').html(response.responseJSON);
                }
            });


        }
    });
}
function closeModal() {
    // حذف المعلومات المخزنة في ذاكرة التخزين المؤقت للجلسة
    sessionStorage.clear();

}
