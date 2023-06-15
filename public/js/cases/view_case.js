(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })
})();

/********************* */

let data, caseItem, caseID;


(() => {
    console.log(role);
    fetchUserRole()
        .then((role) => {
            console.log(role);
            caseID = window.location.href.split('/');
            caseID = caseID[caseID.length - 1];

            // جلب البيانات من ملف JSON
            $.ajax({
                url: 'http://127.0.0.1:8000/cases/' + caseID,
                dataType: 'json',
                success: function (response) {



                    data = response.cases[0];
                    caseItem = data

                    setCaseData();
                    setCaseAuth();


                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';

                },
                error: function (response) {
                    console.log(response)
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
})();





function setCaseData() {

    // ضبط المحكمة
    document.getElementById('court').append(caseItem.case.court.name + ' في ' + caseItem.case.court.place)
    // ضبط الغرفة
    document.getElementById('room').append(caseItem.case.case_room)
    // ضبط أرقام الأساس


    base_numbers = document.getElementById('base-numbers');
    for (var i = 0; i < caseItem.case_numbers.length; i++) {



        row = document.createElement('div');
        row.classList.add('row');

        baseNum = document.createElement('div');
        baseNum.classList.add('col-6');
        baseNum.id = 'base-number-' + i;

        boldBn = document.createElement('b');
        boldBn.append('رقم الأساس: ')
        baseNum.append(boldBn, caseItem.case_numbers[i].number);

        year = document.createElement('div');
        year.classList.add('col-6');
        year.id = 'year-' + i;

        boldY = document.createElement('b');
        boldY.append('لعام: ')
        year.append(boldY, caseItem.case_numbers[i].date);


        row.append(baseNum, year)
        base_numbers.append(row)


    }



    // ضبط أطراف الدعوى
    tableVss = document.getElementById('vss_table_body');

    plaintiff_lawyers = caseItem.plaintiff_lawyers;
    plaintiff_names = caseItem.plaintiff_names;
    defendant_names = caseItem.defendant_names;
    defendant_lawyers = caseItem.defendant_lawyers;
    n = Math.max(plaintiff_lawyers.length, plaintiff_names.length, defendant_lawyers.length, defendant_names.length);
    for (var i = 0; i < n; i++) {

        row = document.createElement('tr');
        plaintiff_client_ = document.createElement('td');
        if (i < plaintiff_names.length)
            plaintiff_client_.append(plaintiff_names[i].first_name + ' ' + plaintiff_names[i].father_name + ' ' + plaintiff_names[i].last_name)

        plaintiff_lawyer_ = document.createElement('td');
        if (i < plaintiff_lawyers.length)
            plaintiff_lawyer_.append(plaintiff_lawyers[i].first_name + ' ' + plaintiff_lawyers[i].father_name + ' ' + plaintiff_lawyers[i].last_name)


        defendant_client_ = document.createElement('td');
        if (i < defendant_names.length) {
            defendant_client_.append(defendant_names[i].name)
            if (defendant_names[i].phone_number != null)
                defendant_client_.append(' رقمه ' + defendant_names[i].phone_number)
        }
        defendant_lawyer_ = document.createElement('td');
        if (i < defendant_lawyers.length) {
            defendant_lawyer_.append(defendant_lawyers[i].name)
            if (defendant_lawyers[i].phone_number != null)
                defendant_lawyer_.append(' رقمه ' + defendant_lawyers[i].phone_number)
        }

        row.append(plaintiff_client_, plaintiff_lawyer_, defendant_client_, defendant_lawyer_)
        tableVss.append(row)

    }


    // ضبط حالة القضية
    state = document.getElementById("state")
    stateCase = caseItem.case.Value_Status; //1-winner. 2-losser. 3-running. 4-blocking
    if (stateCase == 1) {
        state.classList.add('text-bg-success');
        state.append('رابحة')
    } else if (stateCase == 2) {
        state.classList.add('text-bg-danger');
        state.append('خاسرة')
    } else if (stateCase == 3) {
        state.classList.add('text-bg-info');
        state.append('جارٍ العمل عليها')
    } else if (stateCase == 4) {
        state.classList.add('text-bg-dark');
        state.append('معلقة')
    }


    // ضبط تفاصيل القضية
    document.getElementById('dawa').append(caseItem.case.title)
    if (caseItem.case.claim != undefined)
        document.getElementById('eltemas').append(caseItem.case.claim)
    else {
        document.getElementById('eltemas').append("لا يوجد أي تفاصيل عن الالتماس")
    }
    if (caseItem.case.facts != undefined)
        document.getElementById('waqae').append(caseItem.case.facts)
    else {
        document.getElementById('waqae').append("لا يوجد أي تفاصيل عن الوقائع")
    }


    // ضبط قرارات القضية
    decision_table = document.getElementById('decision-table-body');
    decisions = data.decisions;
    for (var i = 0; i < decisions.length; i++) {
        addDecisionRow(decision_table, decisions[i]);
    }

    // ضبط جلسات القضية
    sessions_table = document.getElementById('sessions-table-body');
    sessions = data.sessions;

    for (var i = 0; i < sessions.length; i++) {
        addSessionRow(sessions_table, sessions[i]);
    }

    // ضبط مرفقات القضية
    attachment_table = document.getElementById('attachment-case-table-body');
    attachments = caseItem.attachments;
    for (var i = 0; i < attachments.length; i++) {
        addAttachmentRow(attachment_table, attachments[i]);
    }





}
function addSessionRow(table, session) {
    const sessionID = session.id;
    row = document.createElement('tr');
    num = document.createElement('td');
    num.append(session.number);

    date = document.createElement('td');
    date.append(session.date);

    description = document.createElement('td');
    description_str = session.description;
    if (session.description.length > 50)
        description_str = session.description.substring(0, 50) + '.. إلخ'

    description.append(description_str);



    const viewBtn = document.createElement('button')
    viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + ' عرض الجلسة كاملة'
    viewBtn.setAttribute('title', 'عرض الجلسة');
    viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
    viewBtn.setAttribute("data-bs-toggle", "modal")
    viewBtn.setAttribute("data-bs-target", "#viewSessionBackdrop")
    viewBtn.onclick = function () {
        viewSession(sessionID)
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
        if (caseItem.case.deleted_at != null) {


            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' مسح الجلسة'
            deleteBtn.setAttribute('title', 'مسح الجلسة');
            deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
            deleteBtn.setAttribute("data-bs-toggle", "modal")
            deleteBtn.setAttribute("data-bs-target", "#deleteSessionBackdrop")

            deleteBtn.setAttribute('data-session-id', sessionID)
            deleteBtn.onclick = function () {
                $('#deleteSessionBackdrop').data('session-id', deleteBtn.getAttribute('data-session-id'));
                document.getElementById('deleteSessionButton').onclick = function () {
                    deleteSession()
                }

            }




            const delOpLi = document.createElement('li');
            delOpLi.append(deleteBtn)
            delOpLi.classList = 'operationMenuItem'



            operationMenu.append(delOpLi);
        }

    }


    operations.append(opBtn, operationMenu);
    row.append(num, date, description, operations);
    row.id = 'session-row' + sessionID;

    table.append(row)

}


function addAttachmentRow(table, attachment) {


    const attachmentID = attachment.id;
    row = document.createElement('tr');
    num = document.createElement('td');
    num.append(attachmentID);



    const name = document.createElement('td');
    name.append(attachment.file_name);




    const downloadOp = document.createElement('button');
    downloadOp.title = 'تنزيل المرفق';
    downloadOp.classList.add('btn', 'btn-info');
    downloadOp.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
        + " تنزيل";
    downloadOp.onclick = function () {
        downloadAttachmentOfCase(attachment.id);
    }


    const downloadOpLi = document.createElement('li');
    downloadOpLi.append(downloadOp)
    downloadOpLi.classList = 'operationMenuItem'




    const viewOp = document.createElement('button');
    viewOp.title = 'معاينة المرفق';
    viewOp.classList.add('btn', 'btn-primary');
    viewOp.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + " معاينة";
    viewOp.onclick = function () {
        viewAttachmentOfCase(attachment.id);
    }


    const viewOpLi = document.createElement('li');
    viewOpLi.append(viewOp)
    viewOpLi.classList = 'operationMenuItem'




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
    operationMenu.append(downloadOpLi, viewOpLi)

    if (role == 1 || role == 2) {
        if (caseItem.case.deleted_at != null) {

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' مسح المرفق'
            deleteBtn.setAttribute('title', 'مسح المرفق');
            deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
            deleteBtn.setAttribute("data-bs-toggle", "modal")
            deleteBtn.setAttribute("data-bs-target", "#deleteCaseAttachmentBackdrop")
            deleteBtn.setAttribute('data-attachment-id', attachmentID)
            deleteBtn.onclick = function () {
                $('#deleteCaseAttachmentBackdrop').data('attachment-id', deleteBtn.getAttribute('data-attachment-id'));
                document.getElementById('deleteAttachmentButton').onclick = function () {
                    deleteAttachmentOfCase()
                }

            }

            const delOpLi = document.createElement('li');
            delOpLi.append(deleteBtn)
            delOpLi.classList = 'operationMenuItem'



            operationMenu.append(delOpLi);
        }
    }


    operations.append(opBtn, operationMenu);
    row.append(num, name, operations);
    row.id = 'case-attachment-row' + attachmentID;

    table.append(row)

}


function saveFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    console.log(link.href);
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadAttachmentOfCase(attID) {
    console.log('سيتم تنزيل هذا الملف' + attID)
    $.ajax({
        url: "http://127.0.0.1:8000/case/attachment/download",
        method: "get",
        data: { 'attachment_id': attID },
        success: function (response) {
            console.log('تم التنزيل'); // ��ر�� الخط�� في
            saveFile(response.download_link);

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}


function viewAttachmentOfCase(attID) {
    $.ajax({
        url: "http://127.0.0.1:8000/case/attachment/download",
        method: "get",
        data: { 'attachment_id': attID },
        success: function (response) {
            window.open(response.download_link, '_blank');

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}

function deleteAttachmentOfCase() {
    attID = $('#deleteCaseAttachmentBackdrop').data('attachment-id');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/case/attachment/delete",
        method: "delete",
        data: { 'attachment_id': attID },
        success: function (response) {
            if (response.status == 'success') {
                document.getElementById("case-attachment-row" + attID).remove();

            }
            $('#deleteCaseAttachmentBackdrop').modal('hide');
            document.getElementById('message-text').innerHTML = response.message;
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}
function setCaseAuth() {



    if (role != 1 && role != 2) {
    }
    else {



        case_operation = document.createElement('div');
        case_operation.classList.add('container')
        if (caseItem.case.deleted_at == null) {

            const edit_btn = document.createElement('button')
            edit_btn.type = "button"
            edit_btn.id = "edit-button"
            edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
            edit_btn.setAttribute("data-bs-toggle", "modal")
            edit_btn.setAttribute("data-bs-target", "#editCaseBackdrop")
            edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل معلومات القضية';
            case_operation.append(edit_btn)
        }


        const remove_btn = document.createElement('button')
        remove_btn.type = "button"
        remove_btn.id = "remove-button"
        remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
        remove_btn.setAttribute("data-bs-toggle", "modal")
        remove_btn.setAttribute("data-bs-target", "#deleteCaseBackdrop")
        remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
            + ' إزالة القضية'
        remove_btn.style.margin = '0 1%'

        const archive_btn = document.createElement('button')
        archive_btn.type = "button"
        archive_btn.id = "archive-button"
        archive_btn.classList.add('operations-btn', 'btn', 'btn-warning')
        archive_btn.setAttribute("data-bs-toggle", "modal")

        if (caseItem.case.deleted_at != null) {//القضية مؤرشفة
            archive_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
                + ' إلغاء أرشفة القضية'
            archive_btn.setAttribute("data-bs-target", "#cancelArchiveCaseBackdrop");

        } else { //القضية غير مؤرشفة
            archive_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
                + ' أرشفة القضية'
            archive_btn.setAttribute("data-bs-target", "#archiveCaseBackdrop");

        }
        case_operation.append(remove_btn)
        case_operation.append(archive_btn);


        document.getElementById('infoOfCase').append(case_operation)


        //لا يتم تغيير أي حالة مادام القضية مؤرشفة
        if (caseItem.case.deleted_at === null) {

            edit_state_btn = document.createElement('button')
            edit_state_btn.type = "button"
            edit_state_btn.classList.add('operations-btn', 'btn', 'btn-secondary');
            edit_state_btn.setAttribute("data-bs-toggle", "modal")
            edit_state_btn.setAttribute("data-bs-target", "#staticBackdrop")
            edit_state_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل الحالة';

            document.getElementById('case_state').append(edit_state_btn)
        }


        if (caseItem.case.deleted_at === null) {



            edit_additional_details = document.createElement('div');
            edit_additional_details.classList.add('container');
            edit_additional_details.innerHTML = ' <button type="button" class="operations-btn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#changeAdditionalDetailsBackdrop"'
                + 'onclick="loadAdditionalDetails()">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل التفاصيل الإضافية'

                + '</button>'
            document.getElementById('additional_details').append(edit_additional_details)
        }
        if (caseItem.case.deleted_at === null) {


            sessions = document.createElement('div');
            sessions.classList.add('container');
            sessions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
                + ' data-bs-toggle="modal" data-bs-target="#addNewSessionBackdrop">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
                + ' إضافة جلسة جديدة'
                + '</button>'
            document.getElementById('sessions').append(sessions)
        }
        if (caseItem.case.deleted_at === null) {


            attachments = document.createElement('div');
            attachments.classList.add('container');
            attachments.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
                + ' data-bs-toggle="modal" data-bs-target="#addNewAttachmentBackdrop">'

                + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus align-text-bottom" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
                + ' إضافة مرفق جديد'
                + '</button>'
            document.getElementById('attachments').append(attachments)
        } if (caseItem.case.deleted_at === null) {


            decisions = document.createElement('div');
            decisions.classList.add('container');
            decisions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
                + ' data-bs-toggle="modal" data-bs-target="#addNewDecisionBackdrop">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
                + ' إضافة قرار جديد'
                + '</button>'
            document.getElementById('decisions').append(decisions)
        }
    }
}

function changeStateCase() {
    $('#chang_state_form').validate(
        {
            rules: {
                state: {
                    required: true
                }
            },
            messages: {
                state: {
                    required: "الرجاء اختيار الحالة الجديدة للقضية"
                }
            },
            submitHandler: function (form) {

                statusID = document.getElementById("selected_state").value;

                console.log(statusID)
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/status_update/" + statusID, // اسم ملف php الذي يقوم بالحذف
                    method: "POST", // طريقة الإرسال POST
                    data: { 'id': caseID, 'Value_Status': statusID },
                    success: function (response) {
                        console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح

                        state = document.getElementById("state");
                        state.classList = [];
                        if (statusID == 1) {

                            state.classList.add('text-bg-success', 'badge', 'state');
                            state.innerHTML = ('رابحة')
                        } else if (statusID == 2) {
                            state.classList.add('text-bg-danger', 'badge', 'state');
                            state.innerHTML = ('خاسرة')
                        } else if (statusID == 3) {
                            state.classList.add('text-bg-info', 'badge', 'state');
                            state.innerHTML = ('جارٍ العمل عليها')
                        } else if (statusID == 4) {
                            state.classList.add('text-bg-dark', 'badge', 'state');
                            state.innerHTML = ('معلقة')
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

function cancelArchiveCase() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/archive/restore",
        method: "post",
        data: { case_id: caseID },
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف

            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح

            document.getElementById('message-text').innerHTML = response.message;
            $('#cancelArchiveCaseBackdrop').modal('hide');
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            document.getElementById('closeModal').onclick = function () {
                window.location.href = "http://127.0.0.1:8000/cases"
            }
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}

function archiveCase() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/" + caseID, // اسم ملف php الذي يقوم بالحذف
        method: "Delete", // طريقة الإرسال POST
        data: { id_Archive: 2, case_id: caseID },
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            document.getElementById('message-text').innerHTML = response.message;
            $('#archiveCaseBackdrop').modal('hide');
            $('#messageBackdrop').modal('show');
            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            document.getElementById('closeModal').onclick = function () {
                window.location.href = "http://127.0.0.1:8000/cases"
            }
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });


}
function deleteCase() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/cases/" + caseID, // اسم ملف php الذي يقوم بالحذف
        method: "Delete", // طريقة الإرسال POST
        data: { id_Archive: 1, case_id: caseID },
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف

            //console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح

            if (response.status === 'success')
                window.location.href = "http://127.0.0.1:8000/cases/"
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}



function editCase() {
    window.location.href = 'http://127.0.0.1:8000/cases/' + caseID + '/edit'


}


function loadAdditionalDetails() {
    document.getElementById('dawa_edit').value = caseItem.case.title
    if (caseItem.case.claim != undefined)
        document.getElementById('eltemas_edit').append(caseItem.case.claim)
    if (caseItem.case.facts != undefined)
        document.getElementById('waqae_edit').append(caseItem.case.facts)

    $('#edit_case_details_form').validate({

        rules: {
            dawa: {
                required: true

            }, eltemas: {
                required: true

            }, waqae: {
                required: true

            }
        },
        messages: {
            dawa: {
                required: "الرجاء إدخال الدعوى"
            },
            waqae: {
                required: "الرجاء إدخال الواقعة"
            },
            eltemas: {
                required: "الرجاء إدخال الالتماس"
            }
        },
        submitHandler: function (form) {
            var eltemas = $('#eltemas_edit').val();
            var dawa = $('#dawa_edit').val();
            var waqae = $("#waqae_edit").val();




            $('#errorEditAdditionalDetails').html('');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: "http://127.0.0.1:8000/updateDetails",
                type: "POST",
                data: {
                    "claim": eltemas,

                    "facts": waqae,
                    "id": caseID
                },
                success: function (response) {
                    console.log(response);

                    if (response.status == 'success') {

                        document.getElementById('eltemas').innerHTML = (eltemas)
                        document.getElementById('waqae').innerHTML = (waqae)
                        closeModal();
                        $('#changeAdditionalDetailsBackdrop').modal('hide');

                    } else {
                        $('.errorEditAdditionalDetails').html(response);
                    }
                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                },
                error: function (response) {
                    console.log(response);
                }
            });


        }
    });
}


function addNewSession() {

    caseID = window.location.href.split('/');

    caseID = caseID[caseID.length - 1];
    console.log(caseID)

    $('#addNewSession_form').validate({
        rules: {
            newSessionNumber: {
                required: true
            },
            newSessionDate: {
                required: true
            },
            newSessionDetails: {
                required: true
            },
            sessionAttachments: {
                required: false,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {
            newSessionNumber: {
                required: "الرجاء إدخال رقم الجلسة"
            },
            newSessionDate: {
                required: "الرجاء إدخال تاريخ الجلسة"
            },
            newSessionDetails: {
                required: "الرجاء إدخال تفاصيل الجلسة"
            },
            sessionAttachments: {
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            document.getElementById('content').style.display = 'none';
            document.getElementById('spinner').style.display = 'flex';
            // تحديد المتغيرات اللازمة
            SessionNumber = $("#newSessionNumber").val();
            SessionDate = $("#newSessionDate").val();
            SessionDetails = $("#newSessionDetails").val();
            SessionAttachments = null;
            if ($("#sessionAttachments")[0].files.length > 0) {
                SessionAttachments = $("#sessionAttachments")[0].files;
            }


            console.log(caseID)
            // تجهيز البيانات للإرسال
            var formData = new FormData();
            formData.append('number', SessionNumber);
            formData.append('date', SessionDate);
            formData.append('description', SessionDetails);
            formData.append('case_id', caseID);

            if (SessionAttachments != null)
                for (var i = 0; i < SessionAttachments.length; i++) {
                    formData.append('atachments[]', SessionAttachments[i]);
                }

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: 'http://127.0.0.1:8000/session',
                method: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the response from the server
                    console.log(response);

                    if (response.status === 'success') {
                        $("#newSessionNumber").val('');
                        $("#newSessionDate").val('');
                        $("#newSessionDetails").val('');
                        sessions_table = document.getElementById('sessions-table-body');
                        session = {
                            'number': SessionNumber,
                            'date': SessionDate,
                            'description': SessionDetails,
                            'id': response.id
                        };
                        addSessionRow(sessions_table, session);

                        $('#addNewSessionBackdrop').modal('hide');

                    }

                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');

                },
                error: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the error
                    console.log(response);

                    $('#errorAddSession').html('error 404');

                }
            });
        }
    });
}

function addNewAttachment() {

    caseID = window.location.href.split('/');
    caseID = caseID[caseID.length - 1];
    $('#addNewAttachment_form').validate({
        rules: {

            newAttachmentFile: {
                required: true,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {

            newAttachmentFile: {
                required: "الرجاء اختيار المرفق",
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة

            document.getElementById('content').style.display = 'none';
            document.getElementById('spinner').style.display = 'flex';
            newAttachmentFile = $("#newAttachmentFile")[0].files[0];


            // تجهيز البيانات للإرسال
            var formData = new FormData();

            formData.append('attachment', newAttachmentFile);
            formData.append('caseID', caseID);

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: 'http://127.0.0.1:8000/case/attachment',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the response from the server
                    attachment = {
                        'id': response.id,
                        'file_name': newAttachmentFile.name
                    };
                    const caseAttachments = document.getElementById('attachment-case-table-body');

                    addAttachmentRow(caseAttachments, attachment)
                    closeModal();
                    $('#addNewAttachmentBackdrop').modal('hide');
                    document.getElementById('message-text').innerHTML = response.message;
                    $('#messageBackdrop').modal('show');
                    $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                },
                error: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the error
                    console.log(response);

                    $('#errorAddAttachment').html('error 404');

                }
            });
        }
    });
}

function closeModal() {
    $('.error').html('');

    // حذف المعلومات المخزنة في ذاكرة التخزين المؤقت للجلسة
    sessionStorage.clear();
}
