
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();


/********************* */
let taskID;

$(document).ready(function () {
    taskID = window.location.href.split('/');
    taskID = taskID[taskID.length - 2];
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'http://127.0.0.1:8000/tasks/' + taskID,
        type: 'get',
        success: function (response) {
            console.log(response)
            data = response;

            setTaskData(data);
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';

        },
        error: function (response) {
            console.log(response)
            document.getElementById('content').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';

        }
    });
});


function setTaskData(data) {

    task = data[0].task;

    document.getElementById('name').value = task.name;
    document.getElementById('priority').value = task.priority;
    document.getElementById('description').value = task.description;
    document.getElementById('end_date').value = task.end_date;
    document.getElementById('start_date').value = task.start_date;


    totalLawyerName = data[0].lawyers.length;
    for (var i = 0; i < totalLawyerName; i++) {
        addLawyerField(data[0].lawyers[i].id);
    }


}


function editTask() {

    $('#task-form').validate(
        {

            rules: {
                name: {
                    required: true
                },
                description: {
                    required: true
                },
                start_date: {
                    required: true,

                },
                end_date: {
                    required: true,
                },
                priority: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "الرجاء إدخال اسم المهمة"
                },
                description: {
                    required: "الرجاء إدخال وصف المهمة"
                },
                start_date: {
                    required: "الرجاء اختيار تاريخ البدء"
                },
                end_date: {
                    required: "الرجاء اختيار تاريخ الانتهاء"
                },
                priority: {
                    required: "الرجاء إدخال أولوية المهمة"

                }
            },
            submitHandler: function (form) {

                task = collectData();
                // Perform adding
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/tasks/" + taskID,
                    type: "put",
                    data: {
                        "lawyers": task.lawyers,
                        "name": task.name,
                        "description": task.description,
                        "start_date": task.start_date,
                        "end_date": task.end_date,
                        "priority": task.priority,
                    },
                    success: function (response) {
                        console.log(response)
                        if (response.status === 'success') {
                            document.getElementById('message-text').innerHTML = response.message;
                            $('#messageBackdrop').modal('show');
                            $('#messageBackdrop').css('background', 'rgba(0,0,0,.3)');
                            document.getElementById('closeModal').onclick = function () {
                                window.location.href = 'http://127.0.0.1:8000/tasks';
                            }
                        }
                    },

                    error: function (response) {
                        // If the login is unsuccessful, display the error message
                        // $('#error').html(response.responseJSON.errors.phone[0]);
                        console.log(response)
                    }
                });


            }
        }
    )
}
