let decision;

function setDecisionAuth() {
    if (role == 1 || role == 2) {
        if (caseItem.case.deleted_at == null) {

            const edit_btn = document.createElement('button')
            edit_btn.type = "button"
            edit_btn.id = "edit-button"
            edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
            edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل معلومات القرار';

            edit_btn.style.marginLeft = '1%'
            edit_btn.onclick = function () {
                confirmEditDecision();
            }

            const remove_btn = document.createElement('button')
            remove_btn.type = "button"
            remove_btn.id = "remove-button"
            remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
            remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' إزالة القرار'
            remove_btn.onclick = function () {
                confirmDeleteDecision(decision.id);
            }
            const decision_operation = document.getElementById('decisionOpperation')
            decision_operation.innerHTML = ''


            decision_operation.classList.add('container');
            decision_operation.append(edit_btn, remove_btn);
        }
    }
}

function viewDecision(id) {


    console.log(id)
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/decision/' + id,
        type: 'get',
        success: function (response) {
            decision = response;


            document.getElementById('decisionNumber').innerHTML = decision.number;
            document.getElementById('decisionDate').innerHTML = decision.date;
            document.getElementById('decisionDetails').innerHTML = decision.description;

            setDecisionAuth();

            /// ضبط الآيدي مشان وقت بدي احذف هي الجلسة
        },
        error: function (response) {
            console.log(response);
        }
    });


}



function deleteDecision() {
    id = $('#deleteDecisionBackdrop').data('decision-id');

    console.log(id)
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/decision", // اسم ملف php الذي يقوم بالحذف
        method: "delete", // طريقة الإرسال POST
        data: { id: id }, // بيانات الطلب، في هذا المثال نحن نرسل معرف العنصر الذي نريد حذفه
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح

            if (response.status == "success") {
                document.getElementById('decision-row' + id).remove();

            }
            $('#deleteDecisionBackdrop').modal('hide');
            $('#viewDecicionBackdrop').modal('hide');

            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#[messageBackdrop]').css('background', 'rgba(0,0,0,.3)');

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}



function confirmDeleteDecision(id) {
    $('#deleteDecisionBackdrop').modal('show');
    $('#deleteDecisionBackdrop').css('background', 'rgba(0,0,0,.3)');

    $('#deleteDecisionBackdrop').data('decision-id', id);
    document.getElementById('deleteDecisionButton').onclick = function () {
        deleteDecision()
    }
}


function confirmEditDecision() {
    $('#editDecisionBackdrop').modal('show');
    $('#editDecisionBackdrop').css('background', 'rgba(0,0,0,.3)');

    document.getElementById('editDecisionNumber').value = decision.number;
    document.getElementById('editDecisionDate').value = decision.date;
    document.getElementById('editDecisionDetails').value = decision.description;



    $('#editDecision_form').validate({
        rules: {
            editDecisionNumber: {
                required: true

            }, editDecisionDate: {
                required: true

            }, editDecisionDetails: {
                required: true

            }
        },
        messages: {
            editDecisionNumber: {
                required: "الرجاء اختيار رقم القرار"
            },
            editDecisionDate: {
                required: "الرجاء اختيار تاريخ القرار"
            },
            editDecisionDetails: {
                required: "الرجاء إدخال تفاصيل القرار"
            }
        },
        submitHandler: function (form) {
            var editDecisionNumber = $('#editDecisionNumber').val();
            var editDecisionDate = $('#editDecisionDate').val();
            var editDecisionDetails = document.getElementById("editDecisionDetails").value;



            $('#errorEditDecision').html('');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: "http://127.0.0.1:8000/decision/update",
                type: "Put",
                data: {
                    "number": editDecisionNumber,
                    "date": editDecisionDate,
                    "description": editDecisionDetails,
                    "id": decision.id
                },
                success: function (response) {
                    console.log(response);

                    if (response.status == 'success') {


                        decision_row = document.getElementById('decision-row' + decision.id);
                        decisionNumber = document.getElementById('decisionNumber');
                        decisionDate = document.getElementById('decisionDate');
                        decisionDetails = document.getElementById('decisionDetails');



                        decision.number = editDecisionNumber;
                        decision.date = editDecisionDate;
                        decision.description = editDecisionDetails;
                        cells = decision_row.getElementsByTagName('td');
                        cells[0].innerHTML = editDecisionNumber
                        decisionNumber.innerHTML = editDecisionNumber;
                        cells[1].innerHTML = editDecisionDate
                        decisionDate.innerHTML = editDecisionDate;
                        cells[2].innerHTML = editDecisionDetails
                        decisionDetails.innerHTML = editDecisionDetails;
                        $('#editDecisionBackdrop').modal('hide');


                    }
                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                },
                error: function (response) {
                    console.log(response);
                    $('#errorEditDecision').html(response.responseJSON);
                }
            });


        }
    });

}


/******************** */

function addDecisionRow(table, decision) {


    const decisionID = decision.id;
    row = document.createElement('tr');
    num = document.createElement('td');
    num.append(decision.number);

    date = document.createElement('td');
    date.append(decision.date);

    details = document.createElement('td');
    details_str = decision.description;
    if (details_str.length > 50)
        details_str = details_str.substring(0, 50) + '.. إلخ'

    details.append(details_str);



    const viewBtn = document.createElement('button')
    viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + ' عرض القرار كامل'
    viewBtn.setAttribute('title', 'عرض القرار');
    viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
    viewBtn.setAttribute("data-bs-toggle", "modal")
    viewBtn.setAttribute("data-bs-target", "#viewDecicionBackdrop")
    viewBtn.onclick = function () {
        viewDecision(decisionID)
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


    const viewOpLi = document.createElement('li');
    viewOpLi.append(viewBtn);
    viewOpLi.classList = 'operationMenuItem'
    operationMenu.append(viewOpLi)

    if (role == 1 || role == 2) {
        if (caseItem.case.deleted_at == null) {

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' مسح القرار'
            deleteBtn.setAttribute('title', 'مسح القرار');
            deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
            deleteBtn.setAttribute("data-bs-toggle", "modal")
            deleteBtn.setAttribute("data-bs-target", "#deleteDecisionBackdrop")



            deleteBtn.setAttribute('data-decision-id', decisionID)
            deleteBtn.onclick = function () {
                $('#deleteDecisionBackdrop').data('decision-id', deleteBtn.getAttribute('data-decision-id'));
                document.getElementById('deleteDecisionButton').onclick = function () {
                    deleteDecision()
                }

            }


            const delOpLi = document.createElement('li');
            delOpLi.append(deleteBtn)
            delOpLi.classList = 'operationMenuItem'

            operationMenu.append(delOpLi,);


        }



    }
    operations.append(opBtn, operationMenu);
    row.append(num, date, details, operations);
    row.id = 'decision-row' + decisionID;
    table.append(row)

}


function addNewDecision() {


    $('#addNewDecision_form').validate({
        rules: {
            newDecisionNumber: {
                required: true
            },
            newDecisionDate: {
                required: true
            },
            newDecisionDetails: {
                required: true
            }
        },
        messages: {
            newDecisionNumber: {
                required: "الرجاء إدخال رقم القرار"
            },
            newDecisionDate: {
                required: "الرجاء إدخال تاريخ القرار"
            },
            newDecisionDetails: {
                required: "الرجاء إدخال تفاصيل القرار",
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة
            newDecisionNumber = $("#newDecisionNumber").val();
            newDecisionDate = $("#newDecisionDate").val();
            newDecisionDetails = $("#newDecisionDetails").val();

            caseID = window.location.href.split('/');
            caseID = caseID[caseID.length - 1];

            decision = {
                "number": newDecisionNumber,
                "date": newDecisionDate,
                "description": newDecisionDetails,
                "case_id": caseID

            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: 'http://127.0.0.1:8000/decision',
                method: 'POST',
                data: decision,
                success: function (response) {
                    // Handle the response from the server
                    console.log(response);
                    decision_table = document.getElementById('decision-table-body');

                    if (response.status === 'success') {
                        decision['id'] = response.id

                        addDecisionRow(decision_table, decision);
                    }

                    closeModal();
                    $('#addNewDecisionBackdrop').modal('hide');
                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                },
                error: function (response) {
                    // Handle the error
                    console.log(response);

                    $('#errorAddDecision').html('error 404');

                }
            });
        }
    });


}
