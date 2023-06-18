let session;

function setSessionAuth() {
    if (role == 1 || role == 2) {
        if (caseItem.case.deleted_at == null) {

            const edit_btn = document.createElement('button')
            edit_btn.type = "button"
            edit_btn.id = "edit-button"
            edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
            edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل معلومات الجلسة';

            edit_btn.style.marginLeft = '1%'
            edit_btn.onclick = function () {
                confirmEditSession();
            }

            const remove_btn = document.createElement('button')
            remove_btn.type = "button"
            remove_btn.id = "remove-button"
            remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
            remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' إزالة الجلسة'
            remove_btn.onclick = function () {
                confirmDeleteSession(session.id);
            }
            const session_operation = document.getElementById('sessionOpperation')
            session_operation.innerHTML = ''


            session_operation.classList.add('container');
            session_operation.append(edit_btn, remove_btn);

            const addAttachmentSessionBtn = document.getElementById('AddAttaachmentForSession');
            addAttachmentSessionBtn.innerHTML = ' <button type="button" class="btn operations-btn " id="add-session-attachment-button"'
                + 'onclick="addNewAttachmentSession()">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
                + ' إضافة مرفق جديد'
                + '</button>'


        }
    }

}
function viewSession(id) {


    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/session/' + id,

        type: 'get',
        success: function (response) {
            session = response;

            document.getElementById('sessionNumber').innerHTML = session.number;
            document.getElementById('sessionDetails').innerHTML = session.description;
            document.getElementById('sessionDate').innerHTML = session.date;
            setSessionAuth();

            setSessionAttachments(session)
            /// ضبط الآيدي مشان وقت بدي احذف هي الجلسة
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });

    function setSessionAttachments(session) {

        const sessionAttachments = document.getElementById('sessionAttachments-body');
        sessionAttachments.innerHTML = ''
        console.log(session)

        const nAttachment = session.attachments.length;
        for (var i = 0; i < nAttachment; i++) {
            addNewAttachmentRow(sessionAttachments, session.attachments[i])

        }
    }

}


function addNewAttachmentRow(table, attachment) {

    const attchmentID = attachment.id;
    const name = attachment.file_name;



    const downloadOp = document.createElement('button');
    downloadOp.title = 'تنزيل المرفق';
    downloadOp.classList.add('btn', 'btn-info');
    downloadOp.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
        + " تنزيل";
    downloadOp.onclick = function () {
        downloadAttachmentOfSession(attachment.id);
    }

    const viewOp = document.createElement('button');
    viewOp.title = 'معاينة المرفق';
    viewOp.classList.add('btn', 'btn-primary');
    viewOp.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + " معاينة";
    viewOp.onclick = function () {
        viewAttachmentOfSession(attachment.id);
    }

    const opperation = document.createElement('div');
    opperation.classList.add('d-flex', 'justify-content-evenly');
    opperation.append(downloadOp, viewOp)

    if (role == 1 || role == 2) {
        if (caseItem.case.deleted_at == null) {

            const removeOp = document.createElement('button');
            removeOp.title = 'حذف المرفق';
            removeOp.classList.add('btn', 'btn-danger');
            removeOp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + " حذف";

            removeOp.onclick = function () {
                deleteAttachmentOfSession(attachment.id);
            }
            opperation.append(removeOp)
        }

    }

    const numberCol = document.createElement('td');
    numberCol.append(attchmentID);

    const nameCol = document.createElement('td');
    nameCol.append(name);


    const opperationCol = document.createElement('td');
    opperationCol.append(opperation);


    const row = document.createElement('tr');
    row.append(numberCol, nameCol, opperationCol)
    row.id = 'session-attachment-row' + attchmentID;

    table.append(row)
}


function saveFile(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadAttachmentOfSession(attID) {

    $.ajax({
        url: "http://127.0.0.1:8000/session/attachment/download", // اسم ملف php الذي يقوم بالحذف
        method: "get", // طريقة الإرسال POST
        data: { 'attachment_id': attID },
        success: function (response) {
            console.log(response)
            saveFile(response.download_link);

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}

function viewAttachmentOfSession(attID) {
    $.ajax({
        url: "http://127.0.0.1:8000/session/attachment/download",
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

function deleteAttachmentOfSession(attID) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/session/attachment/delete", // اسم ملف php الذي يقوم بالحذف
        method: "delete", // طريقة الإرسال POST
        data: { 'attachment_id': attID },
        success: function (response) {
            if (response.status == "success") {
                document.getElementById("session-attachment-row" + attID).remove();
                document.getElementById('message-text').innerHTML = response.message;
                $('#messageBackdrop').modal('show');
                $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');

            } else
                console.log(response);

        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}

function addNewSessionAttachment() {


    $('#addNewSessionAttachment_form').validate({
        rules: {

            newSeesionAttachmentFile: {
                required: true,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {

            newSeesionAttachmentFile: {
                required: "الرجاء اختيار المرفق",
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة

            document.getElementById('content').style.display = 'none';
            document.getElementById('spinner').style.display = 'flex';

            newAttachmentFile = $("#newSeesionAttachmentFile")[0].files[0];


            // تجهيز البيانات للإرسال
            var formData = new FormData();

            formData.append('attachment', newAttachmentFile);
            formData.append('session_id', session.id);
            formData.append('number', session.number);

            console.log(newAttachmentFile);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: 'http://127.0.0.1:8000/session/attachment',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the response from the server
                    if (response.status === 'success') {
                        const sessionAttachments = document.getElementById('sessionAttachments-body');

                        attachment = {
                            'id': response.id,
                            'file_name': newAttachmentFile.name
                        };
                        addNewAttachmentRow(sessionAttachments, attachment)
                        closeModal();
                        $('#addNewSessionAttachmentBackdrop').modal('hide');
                        document.getElementById('message-text').innerHTML = response.message;
                        $('#messageBackdrop').modal('show');
                        $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                    } else {
                        $('#errorAddSessionAttachment').html(response.message);
                    }
                    console.log(response);

                },

                error: function (response) {

                    document.getElementById('content').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    // Handle the error
                    console.log(response);

                    $('#errorAddSessionAttachment').html('error 404');

                }
            });
        }
    });
}

function deleteSession() {
    id = $('#deleteSessionBackdrop').data('session-id');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/session", // اسم ملف php الذي يقوم بالحذف
        method: "delete", // طريقة الإرسال POST
        data: { id: id }, // بيانات الطلب، في هذا المثال نحن نرسل معرف العنصر الذي نريد حذفه
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
            if (response.status === 'success') {
                document.getElementById('session-row' + id).remove();
                $('#deleteSessionBackdrop').modal('hide');
                $('#viewSessionBackdrop').modal('hide');
                document.getElementById('message-text').innerHTML = response.message;
                $('#messageBackdrop').modal('show');
                $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
            }
        },
        error: function (response) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
        }
    });
}

function addNewAttachmentSession() {

    // عرض Modal 2 فوق Modal 1 عند النقر على الزر
    $('#addNewSessionAttachmentBackdrop').modal('show');
    $('#addNewSessionAttachmentBackdrop').css('background', 'rgba(0,0,0,.3)');

}


function confirmDeleteSession(id) {
    $('#deleteSessionBackdrop').modal('show');
    $('#deleteSessionBackdrop').css('background', 'rgba(0,0,0,.3)');
    $('#deleteSessionBackdrop').data('session-id', id);

    document.getElementById('deleteSessionButton').onclick = function () {
        deleteSession()
    }
}


function confirmEditSession() {
    $('#editSessionBackdrop').modal('show');
    $('#editSessionBackdrop').css('background', 'rgba(0,0,0,.3)');

    document.getElementById('editSessionNumber').value = session.number;
    document.getElementById('editSessionDate').value = session.date;
    document.getElementById('editSessionDetails').value = session.description;


    $('#editSession_form').validate({
        rules: {
            editSessionNumber: {
                required: true

            }, editSessionDate: {
                required: true

            }, editSessionDetails: {
                required: true

            }
        },
        messages: {
            editSessionNumber: {
                required: "الرجاء اختيار رقم الجلسة"
            },
            editSessionDate: {
                required: "الرجاء اختيار تاريخ الجلسة"
            },
            editSessionDetails: {
                required: "الرجاء إدخال تفاصيل الحلسة"
            }
        },
        submitHandler: function (form) {
            var editSessionNumber = $('#editSessionNumber').val();
            var editSessionDate = $('#editSessionDate').val();
            var editSessionDetails = document.getElementById("editSessionDetails").value;



            $('#errorEditSession').html('');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: "http://127.0.0.1:8000/session/update",
                type: "put",
                data: {
                    //    "_token": "{{ csrf_token() }}",
                    "number": editSessionNumber,
                    "date": editSessionDate,
                    "description": editSessionDetails,
                    "id": session.id
                },
                success: function (response) {
                    console.log(response);

                    if (response.status == 'success') {

                        session_row = document.getElementById('session-row' + session.id);
                        sessionNumber = document.getElementById('sessionNumber');
                        sessionDate = document.getElementById('sessionDate');
                        sessionDescreption = document.getElementById('sessionDetails');
                        console.log(sessionNumber, sessionDate, sessionDescreption)
                        cells = session_row.getElementsByTagName('td');
                        cells[0].innerHTML = editSessionNumber
                        sessionNumber.innerHTML = editSessionNumber;
                        cells[1].innerHTML = editSessionDate
                        sessionDate.innerHTML = editSessionDate;
                        cells[2].innerHTML = editSessionDetails
                        sessionDescreption.innerHTML = editSessionDetails;
                        $('#editSessionBackdrop').modal('hide');


                    } document.getElementById('message-text').innerHTML = response.message;

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
